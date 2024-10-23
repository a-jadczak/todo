import { useState, useEffect } from 'react'
import Quest from './components/Quest'
import './App.css'
import './styles.css'

// Właściwości Questa
// ID
// TEXT
// STATUS: quest-todo, quest-done, quest-deleted

const initialQuestList = []

function App() 
{
  const [questList, setQuestList] = useState(initialQuestList);
  const [questName, setQuestName] = useState("");

  const [filtrType, setFiltrType] = useState("all")

  const [uniqueID, setUniqueID] = useState(0);

  // Ustawia jak filtorwac zadania
  const handleSelect = (e) => setFiltrType(e.target.value);
  
  // Dodaje nowego questa
  const addQuest = (e) =>
  {
    e.preventDefault();

    // Sprawdza czy input nie jest puste
    if (validate())
        return;
    
    //let newCount = questList.length + 1;
    let newCount = uniqueID + 1;

    // Zapisuje unikalne id
    setUniqueID(newCount);

    //Tworzy nowy quest
    var quest = {
      id: newCount,
      text: questName,
      status : "quest-todo",
      filtrType : ["todo", "all"]
    }

    // Dodaje do listy questa
    const listToSave = [...questList, quest];
    setQuestList(listToSave);

    // Zapisuje nową liste do localStorage
    handleSave(listToSave);
  }

  // Usuwa questa
  const deleteQuest = (id) =>
  {
    // Szuka questa według id a nastepnie go usuwa
    const newQuestList = questList.filter(quest => quest.id !== id);
    setQuestList(newQuestList)

    handleSave(newQuestList);
  }

  const doneQuest = (id) =>
  {
    // szuka questa w zależności od ID, a następnie ustawia go jako zrobionego
    const newQuestList 
    = questList.map(quest => 
    {
        if (quest.id === id)
        {
          var doneQuest = quest;
          doneQuest.status = "quest-done"
          doneQuest.filtrType = ["done", "all"]
          return doneQuest;
        }

        return quest;
    });

    setQuestList(newQuestList)

    handleSave(newQuestList);
  }

  const validate = () => questName.length == 0;

  //zapis do local storage
  const handleSave = (list) => 
  {
    localStorage.setItem("quests", JSON.stringify(list));
    localStorage.setItem("lastLevelID", uniqueID); //Zapis id aby sie nie powtarzało
  };

  // ustawienie wartości z localstorage
  useEffect(() => 
  {
    // Lista
    const savedValue = JSON.parse(
      localStorage.getItem('quests'));

    // Ostatnie użyte ID
    const savedID = parseInt(localStorage.getItem("lastLevelID"));

    if (savedValue) 
    {
      setQuestList(savedValue);
    }
    if (savedID)
    {
      setUniqueID(savedID);
    }
  }, []);


  // ...


  return (
    <main>
      <h1>TODO:</h1>
      <form action="">
        <input 
          type="text"
          placeholder="Zadanie"
          className="questInput"
          value={questName}
          onChange={(e) => setQuestName(e.target.value)}
          />

        <button onClick={addQuest}>Dodaj</button>

        <label>Filtruj zadania: </label>
        <select value={filtrType} onChange={handleSelect}>
          <option value="all">Wszystkie</option>
          <option value="todo">Do zrobienia</option>
          <option value="done">Zrobione</option>
        </select>

      </form>

        <h2>Do zrobienia:</h2>
      <ul className='quest-container'>
        {
          questList.length ?
          questList
          //Filtruje questy według tablicy
          .filter(quest => quest.filtrType.includes(filtrType))
          .map( 
            (quest) => 
              <Quest 
              key={quest.id} 
              questText={quest.text} 
              status={quest.status}
              onDone={() => doneQuest(quest.id)}
              onDelete={() => deleteQuest(quest.id)}
              />
          ) 
          :
          <h4>Nic 😎</h4>
        }
      </ul>

    </main>
  )
}

export default App
