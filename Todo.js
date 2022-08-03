import React from "react";
import { useState, useEffect } from "react";
import todo from "../images/image.svg";
import "../App.css";

function Todo() {
  const getlocalitem = () => {
    let list = localStorage.getItem("lists");
    console.log(list);
    if (list) {
      return JSON.parse(localStorage.getItem("lists"));
    } else {
      return [];
    }
  };
  const [item, setItem] = useState("");
  const [arrItem, setarrItem] = useState(getlocalitem());
  const [toggleSubmit, setToggle] = useState(true);
  const[changeItem,setChangeItem]=useState(null);

  const display = () => {
    if (!item) {
      alert("Plz fill data");

    } else if(item && !toggleSubmit){
       setarrItem(
            arrItem.map((elem)=>{
              if(elem.id===changeItem){
                return{...elem,name:item}
              }
              return elem;
            })
       )
       setToggle(true);
    setItem('');
    setChangeItem(null);
    }
    else{
      const allItem = { id: new Date().getTime().toString(), name: item };

      setarrItem([...arrItem, allItem]);
      setItem("");
    }
  };
  const deleteItem = (id) => {
    console.log(id);
    let updateid = arrItem.filter((elem) => {
      return id != elem.id;
    });
    setarrItem(updateid);
  };
  const removeelement = () => {
    setarrItem([]);
  };
  const editItem = (id) => {
    let newEditItem = arrItem.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);
    setToggle(false);
    setItem(newEditItem.name);
    setChangeItem(id);
  };
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(arrItem));
  }, [arrItem]);
  return (
    <>
      <figure className="App">
        <img id="img" src={todo} alt="do not found image"></img>
        <figcaption>Add your List here</figcaption>
      </figure>

      <div className="App">
        <input
          className="input"
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="✍️ Add items...."
          autoFocus
        ></input>
        {
          toggleSubmit?<button type="button" class="btn btn-primary add" title="Add Item" onClick={display}>
          Add
        </button>: <button  type="button" title="update Item"class="btn btn-info u"onClick={display}>
          update</button>
        }


        {arrItem.map((elem) => {
          return (
            <div className="displayItems" key={elem.id}>
              <h4>
                {elem.name}
                </h4>
                
                
                <button
                  class="btn btn-warning update"
                  type="button"
                  title="update item"
                  onClick={() => editItem(elem.id)}
                >
                  update
                </button>
                

                <button
                  class="btn btn-danger delete"
                  type="button"
                  title="delete item"
                  onClick={() => deleteItem(elem.id)}
                >
                  Delete
                </button>
                </div>
             
          );
        })}

        <div className="button">
          <button
            class="btn btn-dark remove"
            type="button"
            onClick={removeelement}
            title="Remove all items"
          >
            Remove all
          </button>
        </div>
      </div>
    </>
  );
}
export default Todo;
