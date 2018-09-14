import React, { Component } from "react";
import RecipeList from "./RecipeList";
import RecipeDetails from "./RecipeDetails";
import RecipeModal from "./RecipeModal";
import "normalize.css";

class RecipeBox extends Component {
    constructor(props){
        super(props);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.handleNameKeypress = this.handleNameKeypress.bind(this);
        this.handleIngredientsKeypress = this.handleIngredientsKeypress.bind(this);
        this.handleInstructionsKeypress = this.handleInstructionsKeypress.bind(this);
        this.handleRecipeChoice = this.handleRecipeChoice.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.state ={
            recipes: [],
            modal: false,
            name: "",
            ingredients:"",
            instructions: "",
            details: [],
            edit: false,
            label: ""
        }
    }

    handleModalOpen (event){
        if(event.target.textContent.includes("Create")){
            this.setState({modal: true, label: "Create", 
                name: "", ingredients: "", instructions: "" });
        } else if(event.target.textContent.includes("Edit")){
            this.setState({modal: true, edit: true, label: "Edit",
                name: this.state.details[3], 
                ingredients: this.state.details[0].join("\r\n"),
                instructions: this.state.details[1].join("\r\n")
            });
        }
    }

    handleModalClose (){
        this.setState({modal: false, edit: false});
    }

    handleNameKeypress(event){
        this.setState({name: event.target.value });
    }

    handleIngredientsKeypress(event){
        this.setState({ingredients: event.target.value });        
    }

    handleInstructionsKeypress(event){
        this.setState({instructions: event.target.value });        
    }

    addRecipe(event){
        event.preventDefault();
        const ingredientsArr = this.state.ingredients.split(/\n/g);
        const instructionsArr = this.state.instructions.split(/\n/g);
        const id = this.guidGenerator();
        this.setState((prevState) => {
            return {
                recipes: [...prevState.recipes, {
                    id: id,
                    name: this.state.name, 
                    ingredients: ingredientsArr, 
                    instructions: instructionsArr}]
            }
        });
    }

    editRecipe(event){
        event.preventDefault();
        const ingredientsArr = this.state.ingredients.split(/\n/g);
        const instructionsArr = this.state.instructions.split(/\n/g);
        const id = this.state.details[2];
        const name = this.state.name;
        const recipeIndex = this.state.recipes.findIndex((recipe) => recipe.id === id);
        const recipes = [...this.state.recipes];

        recipes[recipeIndex].name = name;
        recipes[recipeIndex].instructions = instructionsArr;
        recipes[recipeIndex].ingredients = ingredientsArr;
        this.setState({ recipes: recipes, details: [ingredientsArr, instructionsArr, id, name]});
    }

    deleteRecipe(event){
        const id = event.target.id;
        const recipeIndex = this.state.recipes.findIndex((recipe) => recipe.id === id);
        const recipes = [...this.state.recipes];
        recipes.splice(recipeIndex, 1);
        this.setState({ recipes: recipes, details: []});
    }

    handleRecipeChoice(event){
        const id = event.target.id;
        const recipeIndex = this.state.recipes.findIndex((recipe) => recipe.id === id);
        const instructions = this.state.recipes[recipeIndex].instructions;
        const ingredients = this.state.recipes[recipeIndex].ingredients;
        const name = this.state.recipes[recipeIndex].name;
        this.setState((prevState) => ({ details: [ingredients, instructions, id, name], 
            name: name, ingredients: ingredients, instructions: instructions}));
    }

    guidGenerator() {
        function S4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return S4()+S4()+'-'+S4()+'-'+S4()+'-'+S4()+'-'+S4()+S4()+S4();
      }

    componentDidMount(){
        try {
            const json = localStorage.getItem("recipes");  
            const recipes = JSON.parse(json);
            if(recipes){
                this.setState({recipes: recipes, 
                    details: [recipes[0].ingredients, recipes[0].instructions, recipes[0].id, recipes[0].name]})
            }
            window.addEventListener(
                "beforeunload",
                this.saveStateToLocalStorage.bind(this)
              );
        } catch(e){
            //do nothing
        }
    }

    componentWillUnmount() {
        window.removeEventListener(
          "beforeunload",
          this.saveStateToLocalStorage.bind(this)
        );
    
        // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
    }

    saveStateToLocalStorage(){
        localStorage.setItem("recipes", JSON.stringify(this.state.recipes));
    }

    render() {
        return (
        <div className="container">
            <h1>Recipe Box</h1>

            <RecipeList list={this.state.recipes}
                        clickRecipe={this.handleRecipeChoice}            
            />

            { this.state.details.length !== 0 ?
                <RecipeDetails details={this.state.details} editStart={this.handleModalOpen} delete={this.deleteRecipe} onClick={this.handleModalOpen}/>
                : <div className="details container"> 
                    <button onClick={this.handleModalOpen}>Create Recipe</button>
                </div>
            }
            <RecipeModal 
                    open={this.state.modal} 
                    handleModalClose={this.handleModalClose}
                    onSubmit={this.state.label === "Create" ? this.addRecipe : this.editRecipe}
                    name={this.state.name}
                    nameKey={this.handleNameKeypress}
                    ingredients={this.state.ingredients}
                    ingredientsKey={this.handleIngredientsKeypress}
                    instructions={this.state.instructions}
                    instructionsKey={this.handleInstructionsKeypress}
                    label={this.state.label}
            />
        </div>
        )
    }
}

export default RecipeBox;