import React from "react";
import Modal from "react-modal";
Modal.setAppElement('#app');

const RecipeModal = (props) => (
    <Modal
        className="modal"
        isOpen={props.open}
        onRequestClose={props.handleModalClose}
        contentLabel={`${props.label} Recipe`}
        closeTimeoutMS={200}
    >
        <h2>{props.label} Recipe</h2>

        <form onSubmit={props.onSubmit} method="post">
            <h3>Recipe Name</h3>
            <input name="name"
                type="text" value={props.name} onChange={props.nameKey} required/>
            
            <h3>Ingredients</h3>
            <textarea id="" cols="30" rows="8" name="ingredients"
                type="text" value={props.ingredients} onChange={props.ingredientsKey} 
                placeholder="Please use a new line for each new ingredient using enter/return." required>
            </textarea>

            <h3>Instructions</h3>
            <textarea id="" cols="30" rows="8" name="instructions"
                            value={props.instructions} onChange={props.instructionsKey} 
                            placeholder="Please use a new line for each new instruction using enter/return." required>
            </textarea>

            <button
                type="submit"
                className="button"
                onClick={props.handleModalClose}
            >
                Okay
            </button>
        </form>
    </Modal>
);

// export default class RecipeModal extends React.Component {

// }

export default RecipeModal;