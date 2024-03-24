import React from 'react'

import ItemIngredient from './item-ingredient/item-ingredient'

export default function GroupIngredients({title, elements, selectedHandler}) {

    return (
        <>
            <div className='pt-10'>
                <span className="text text_type_main-medium"> {title}</span>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}} className='pt-3 pl-1 pb-3'>
                {
                    elements.map(
                        // TODO count for demo
                        (element, index) => (<ItemIngredient key={element._id} item={element} count={ index == 0 ? 1 : 0} selectedHandler={selectedHandler}/>)
                    )
                }
            </div>
        </>
    )
}

