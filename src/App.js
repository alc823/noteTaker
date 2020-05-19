import React, { Component } from 'react';
import './App.css';
import Note from "./Note.js";
import NoteList from "./NoteList.js";

class App extends Component {
/*Remove extraneous comments and console.logs from final code.*/
 //Once I create a new card, should the example card stay visible to a user? 
  
  // Defining State
  constructor(props) {
    super(props)
    this.state = {
      notes: [
        { title: "Example Note", 
        description:"This is an example description - here is where you write the body of your note!", 
        date: new Date().toLocaleString(), 
        id: 0, 
        category: 'Task' },
      ],
      categories: ['Task'],
    }
  }

  //I don't personally use @param in my code. you can use it but not entirely necessary. 
  
  /** handleAddNote(newNote)
   * adds a new note to the notes list in state; also adds a new category if the category of the new note
   * is not an empty string
   * 
   * @param newNote the note to be added to the notes list in state
   */
  handleAddNote = (newNote) => {
    //I would prefer to take the logic out of setState and handle it before setState but still in this function.
    //Then setState can be really easy for another engineer to understand what is changing.
    
    this.setState(prevState => {
      if (newNote.category !== '' && this.state.categories.indexOf(newNote.category) == -1) {
        if (prevState.categories.length == 0) {
          return {
            notes: [...prevState.notes, newNote],
            categories: [newNote.category]
          }
        }
        return {
          notes: [...prevState.notes, newNote],
          categories: [...prevState.categories, newNote.category]
        }
      } else {
        return { notes: [...prevState.notes, newNote] };
      }
    });
  };

  /** handleRemoveNote(toDeleteNote)
   * removes a given note from the notes list in state; even if the note is the last of a particular category,
   * the category will not be removed from the categories list in state unless explicitly done elsewhere
   * 
   * @param toDeleteNote the note to be deleted
   */

//to in toDeleteNote signifies an action happening within this variable meaning this variable contains a function.
//Instead handleRemoveNote simply accepts a single note. Change the variable name to be a noun.
  handleRemoveNote = (toDeleteNote) => {
    //I like how you handled the logic in this function
    const newNotesList = this.state.notes.filter(note => note.id !== toDeleteNote.id);
    this.setState(prevState => {
      return { notes: newNotesList };
    })
  }

  /** handleRemoveCategory(toRemoveCategory)
   * removes a category form the categories list in state
   * 
   * @param toRemoveCategory the category to be removed
   */
  
  //same comment with toRemoveCategory naming
  handleRemoveCategory = (toRemoveCategory) => {
    this.setState(state => {
      //love the null check 
      const newCategoriesList = this.state.categories.filter(category => category !== toRemoveCategory && category !== null)
      const newNotesList = this.state.notes.map(note => {
        if (note.category == toRemoveCategory) {
          const adjustedNote = {
            title: note.title,
            description: note.description,
            date: new Date().toLocaleString(),
            id: note.id,
            category: ''
          }
          return adjustedNote;
        } else {
          return note;
        }
      });

      return {
        notes: newNotesList,
        categories: newCategoriesList
    }
    });
  }

  // Code for edit help: 
  /** handleEditNote (id, newTitle, newDescription, newCategory)
   * edits an existing note; fields that can be changed include title, description, and category; if category
   * is changed into something that is not already in the categories list in state AND that category is not an empty string,
   * then the new category is added to the categories list in state
   * 
   * @param id the id of the note in question; used to identify the correct note to edit
   * @param newTitle the new title of the note; by default, is the old title of the note
   * @param newDescription the new description of the note; by default is the old description of the note
   * @param newCategory the new category of the note; by default is the old category of the note
   * 
   * Sources: 
   * https://stackoverflow.com/questions/57362707/reactjs-show-edit-form-onclick
   * https://stackoverflow.com/questions/28121272/whats-the-best-way-to-update-an-object-in-an-array-in-reactjs
   * https://www.robinwieruch.de/react-state-array-add-update-remove
   * https://stackoverflow.com/questions/45277306/check-if-item-exists-in-array-react
   */
  
  //put logic before this.setState
  handleEditNote = (id, newTitle, newDescription, newCategory) => {
    this.setState(state => {
      const notes = this.state.notes.map(item => {
        if (item.id == id) {
          const adjustedItem = {
            title: newTitle,
            description: newDescription,
            date: new Date().toLocaleString(),
            id: id,
            category: newCategory
          }
          return adjustedItem;
        } else {
          return item;
        }
      });
      
      if (this.state.categories.indexOf(newCategory) == -1 && newCategory !== '') {
        if (this.state.categories.length == 0) {
          return {
            notes: notes,
            categories: [newCategory]
          }
        } else {
          return {
            notes,
            categories: [...this.state.categories, newCategory]
          };
        }
      } else {
        return {
          notes: notes,
          categories: [...this.state.categories]
        }
      }
      
    });
  }

  render() {
    return (
      <div className='page'>
        <Note 
          notes = {this.state.notes}
          handleAddNote = {this.handleAddNote}
        />
        <br>
        </br>
        <div style={{textAlign: "center"}}>
          <NoteList 
            notes = {this.state.notes}
            categories = {this.state.categories}
            handleRemoveNote = {this.handleRemoveNote} 
            handleEditNote = {this.handleEditNote}
            handleRemoveCategory = {this.handleRemoveCategory}
          />
        </div>
        
      </div>
    );
  }
}

export default App;
