export default function Button({txt,clickHandler }){
 
    return(
        <div className="relative">
            <button 
                onClick={clickHandler} 
                className={`self-start flex mt-4 bg-yellow-300 p-2 rounded-lg ${txt === 'Review Invoice' ? 'w-full justify-center' : ''}`}>
                {txt}
            </button>            
        </div>
    )
}

