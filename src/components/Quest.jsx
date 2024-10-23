const Quest = ({questText, onDone, onDelete, status}) =>
{
    // todo, done, deleted

    const doneQuest = () => 
    {
        onDone();
    }

    const deleteQuest = () => 
    {
        onDelete();
    }

    return(
        <>
        <li className={"quest " + status}>
            <span>{questText}</span>

            {status != "quest-done" &&
            <button 
            onClick={doneQuest} 
            className="button-done">Zrobione</button>}

            <button 
            onClick={deleteQuest}
            className="button-delete">Usuń</button>
        </li>
        </>
    )
}

export default Quest;