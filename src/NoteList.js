import React, { Component } from "react";
import "./NoteList.css";
import { isEmpty } from "lodash";
import { Card } from 'antd';
// Card component from Ant Design: https://ant.design/components/card/#

class NoteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [
                { title: "Main course 1", description:"blah", date: new Date().toLocaleString() },
            ],
            categories: [],

            title: '',
            description: '',
            category: '',
            id: -1,

            isFormVisible: false, // determines whether edit form is seen

            chosenCategory: 'No Filter', // whatever option is currently selected in the filter dropdown menu
            finalizedCategory: 'No Filter', // the option that is submitted for the filter dropdown menu
        }
    }

    // Code for edit help: https://stackoverflow.com/questions/57362707/reactjs-show-edit-form-onclick
    // runs handleEditNote if Edit button on any particular note is pressed
    handleSubmit = () =>{
        this.props.handleEditNote(this.state.id, this.state.title, this.state.description, this.state.category)
        this.setState({
            isFormVisible: false,
        })
    }

    // updates state if title, description, or category text fields are changed in the edit form
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    // updates state if selected option in filter dropdown menu is changed
    handleFilterChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    // runs handleRemoveCategory if the Remove Category buton is selected
    handleRemoveCategory = () => {
        this.props.handleRemoveCategory(this.state.chosenCategory)
        this.setState({
            chosenCategory: "No Filter",
            finalizedCategory: "No Filter"
        })
    }

    // Card Design: https://ant.design/components/card/#header
    // Dropdown Reference: https://reactjs.org/docs/forms.html 
    render() {
        const {notes} = this.props
        return (
            <div className="bottomPart" style={{ display: "flex" }}>
                <div className="notelist" style={{ flex: 3 }}>
                    <div className="sectionTitle">Note List</div>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                            {isEmpty(notes) &&
                            <div className="empty" style={{ display: "flex", justifyContent: "center" }}><br/><br/><br/>
                            No notes yet. Fill out the fields at the top of the page to add notes!
                            </div>
                            }

                            {notes.map(note => {
                                return (
                                    <div>
                                    { (this.state.finalizedCategory === "No Filter" || note.category === this.state.finalizedCategory) &&
                                        <div 
                                        style={{ 
                                            borderStyle: "double", 
                                            width:300, 
                                            marginLeft: 5, 
                                            marginTop: 5, 
                                            backgroundColor: "lightyellow",
                                            borderRadius: 10,
                                            borderColor: "gray",
                                            display: "flex",
                                            justifyContent: "left",
                                        }}
                                        className="noteContent">
                                            <div style={{ marginTop: 10 }}>
                                            {(!this.state.isFormVisible || this.state.id !== note.id) && 
                                            <div bordered={true} className="card"
                                                style={{ 
                                                    width: 300,
                                                }}
                                            >
                                                <div style={{margin: 20}}>{note.title}</div>
                                                <div className="noteContent">
                                                            <div style={{ margin: 20, textAlign: "left", flexWrap: "wrap", display: "flex", width:300}}>
                                                                <div style={{display: "inline", textDecoration: "underline"}}>Last Edited:</div>{" "}{note.date}

                                                                {note.category !== '' &&
                                                                    <div style={{width:300}}>
                                                                        <div style={{display: "inline", textDecoration: "underline"}}>Category:</div> {note.category}
                                                                    </div>
                                                                }
                                                                <div style={{marginTop: 20}}>
                                                                    <div style={{display: "inline", textDecoration: "underline", textAlign: "left", marginLeft: 0, paddingLeft:0 }}>Description:</div> {note.description}
                                                                </div>
                                                            </div>

                                                            
                                                </div>
                                                <div>
                                                                {" "}
                                                                <button className="button" 
                                                                onClick={() => this.setState({
                                                                    isFormVisible: true,
                                                                    title: note.title,
                                                                    description: note.description,
                                                                    id: note.id,
                                                                    category: note.category,
                                                                })}>Edit</button>
                                                            
                                                                {" "}
                                                                <button className="button" onClick={() => this.props.handleRemoveNote(note)}>Remove</button>
                                                            </div>
                                                </div>

                                            }
                                            </div>

                                            {this.state.isFormVisible && this.state.id === note.id && 
                                            <Card className="card" 
                                            style={{ width: 300, marginTop: 20, marginBottom: 10 }}
                                            >
                                            <div className="noteContent">
                                                <form onSubmit={this.handleSubmit}>
                                                    <label className="fieldLabel">
                                                    Title:</label>{"   "}
                                                    <input type="text" name="title" id="title" placeholder={note.title} 
                                                    value={this.state.title} onChange={this.handleChange}
                                                    style={{ width: 150, marginLeft: 38 }}
                                                    maxLength='50'/>
                                                    

                                                    <br></br>

                                                    <label className="fieldLabel" style={{ marginBottom: 40 }}>
                                                    Description:</label>{" "}
                                                    <textarea type="text" name="description" id="description" 
                                                    placeholder={note.description} value={this.state.description} 
                                                    onChange={this.handleChange}
                                                    style={{ height: 100, width: 150 }}
                                                    maxLength='300'/>
                                                    

                                                    <br/>

                                                    <label className="fieldLabel">
                                                    Category:</label>{" "}
                                                    <input type="text" name="category" id="category" placeholder={note.category} value={this.state.category} 
                                                    onChange={this.handleChange}
                                                    style={{ width: 150, marginLeft: 13 }}
                                                    maxLength='50'/>
                                                    
                                                </form>
                                                <button type="button" className="button" onClick={this.handleSubmit}>Save</button>
                                            </div>
                                            </Card>
                                            }
                                        </div>
                                    }
                                    </div>
                                );
                            })}
                    </div>
                </div>

                <div className="categories" style={{ flex: 1, marginRight: 5 }}>
                    <div className="sectionTitle" style={{ marginTop: 5 }}>Categories</div>
                    <div className="categoryContent" style={{ borderStyle: "double", borderColor: "gray" }}>
                        {!isEmpty(this.props.categories) &&
                            
                            <div>
                                <form>
                                    <label>
                                    Filter your notes based on category:<br/>
                                    </label>
                                    <select className="dropdown" name="chosenCategory" value={this.state.chosenCategory} onChange={this.handleFilterChange}>
                                        <option className="option">No Filter</option>
                                        {this.props.categories.map(category => {
                                            return (
                                                <option className="option">{category}</option>
                                            );
                                        })}
                                    </select>
                                    
                                </form>
                                <br/>
                                <button type="button" className="button" onClick={() => this.setState({finalizedCategory: this.state.chosenCategory})}>Filter</button>{" "}
                                <button type="button" className="button" onClick={this.handleRemoveCategory}>Remove Category</button>
                            </div>

                        }

                        {isEmpty(this.props.categories) &&
                        <div>
                            No categories yet. Add categories by editing an existing note or creating a new note!
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default NoteList;
