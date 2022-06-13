
import './button.css'

export function Button({simb, label, operation, double, triple, action}) {

    // primeira forma
    let classe = 'btn'
    classe += operation ? ' operation' : ''
    classe += double ? ' double' : ''
    classe += triple ? ' triple' : ''
    
    return (

        <button className={classe} onClick={e => action(label)}>
            {label}<span className='material-icons'>{simb}</span>
        </button>
    )
}