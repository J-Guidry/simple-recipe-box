import React from "react";

const RecipeDetails = (props) => (
    <div>
        <div className="label container">
            <h2 className="recipe-label" >
            {props.details[3]}
            </h2>

                <button onClick={props.onClick} className="create">Create New Recipe</button>

            {props.details.length !== 0 ? 
                
                <button className="edit" onClick={props.editStart}>Edit Recipe</button>  : ""}

            {props.details.length !== 0 ? 
                <button className="delete" id={props.details[2]} onClick={props.delete}>Delete Recipe</button>  : ""}
                
        </div>
        <div className="details container">  
            <div className="ingredients">
            <h3>Ingredients</h3>
                <ul>
                {
                    props.details.length !== 0 ? 
                    
                    props.details[0].map((ingredient, index)=> <li key={"ing: "+ index +props.details[2]}>{ingredient}</li>)
                        : ""
                }
                </ul>
            </div>
            <div className="instructions">
            <h3>Instructions</h3>
                <ul>
                {
                    props.details.length !== 0 ? 
                    props.details[1].map((instruction, index) => <li key={"ins: "+ index+props.details[2]}>{instruction}</li>)
                        : ""
                }
                </ul>
            </div>
            

        </div>
    </div>
);

export default RecipeDetails;
/*        <ol>
            {props.details.map(recipe => <li key={recipe.id}> {recipe.instructions}</li>)}
        </ol>*/
// export default class RecipeDetails extends React.Component {
    // componentDidUpdate(prevProps, prevState){
    //     if(prevProps.recipes.length !== this.props.recipes.length){
    //         console.log("update state and component");
    //         //const json = JSON.stringify(this.state.recipes);
    //         //localStorage.setItem("recipes", json);
    //         //this.state.recipes;
    //         //console.log(localStorage.recipes);
    //     }
    // }
    // render(){
    //     return(
    //         <div className="details">
    //             <h2>Details</h2>    
    //             <div className="ingredients">
    //                 <ul>
    //                 {
    //                     this.props.details.length !== 0 ? 
    //                      this.props.details[0].map(ingredient => <li key={"ing"+ingredient.id}>{ingredient}</li>)
    //                         : "none"
    //                 }
    //                 </ul>
    //             </div>
    //             <div className="instructions">
    //                 <ul>
    //                 {
    //                     this.props.details === false || [] ? 
    //                     ""
    //                         : this.props.details[1].map(instruction => <li key={"ins" + instruction.id}>{instruction}</li>)
    //                 }
    //                 </ul>
    //             </div>  
    //             </div> 
    //     )     
    // }
// }