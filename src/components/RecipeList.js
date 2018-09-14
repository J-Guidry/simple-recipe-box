import React from "react";

const RecipeList = (props) => (
    <div className="list">
        <ul>
        {
            props.list.length !== 0 ? 
                props.list.map(recipe => 
                    <li className="clickable"
                        key={recipe.id}
                        id={recipe.id}
                        onClick={props.clickRecipe}
                    >
                    {recipe.name}
                    </li> 
                ): ""
        }
        </ul>
    </div>
);

export default RecipeList;