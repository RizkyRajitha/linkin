import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import './App.css';
import LinkCard from "./linkcard";

const finalSpaceCharacters = [
  {
    id: 263,
    pagedataid: 1,
    iconClass: "fab fa-facebook",
    displayText: "Facebook",
    linkUrl: "",
    bgColor: "#000000",
    borderRadius: null,
    textColor: "#ff0000",
    accentColor: null,
    active: true,
    orderIndex: 0,
    // created_at: 2021-06-17T09:58:23.756Z
  },
  {
    id: 266,
    pagedataid: 1,
    iconClass: "fab fa-twitter",
    displayText: "Twitter",
    linkUrl: "",
    bgColor: "#000000",
    borderRadius: null,
    textColor: "#ff0000",
    accentColor: null,
    active: true,
    orderIndex: 1,

    // created_at: 2021-06-19T06:31:03.634Z
  },
  {
    id: 283,
    pagedataid: 1,
    iconClass: "",
    displayText: "1 1",
    linkUrl: "",
    bgColor: "#2c6bed",
    borderRadius: "4px",
    textColor: "#ffffff",
    accentColor: null,
    active: true,
    orderIndex: 2,
    // created_at: 2021-07-08T13:18:14.745Z
  },
];

function TEstt() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    console.log(result);
    // console.log(characters);

    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    let updateditems = items.map((item, index) => {
      item.orderIndex = index;
      return item;
    });
    // let sorted = updateditems.sort()
    console.log(updateditems);
    console.log(items);

    updateCharacters(updateditems);

    console.log(
      characters.map((item) => {
        return { name: item.displayText, id: item.orderIndex };
      })
    );
  }

  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* <h1>Final Space Characters</h1> */}
      <button
        onClick={(e) => {
          console.log(characters);
        }}
      >
        show
      </button>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {characters.length &&
                characters.map((item, index) => {
                  console.log(index);
                  return <LinkCard key={index} item={item} index={index} />;
                })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      {/* </header> */}
      {/* <p>
        Images from{" "}
        <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">
          Final Space Wiki
        </a>
      </p> */}
    </div>
  );
}

export default TEstt;

{
  /* <Draggable key={id} draggableId={id} index={index}>
{(provided) => (
  <li
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
  >
    <div className="characters-thumb">
      <img src={thumb} alt={`${name} Thumb`} />
    </div>
    <p>{name}</p>
    <LinkCard
      item={{
        id: 283,
        pagedataid: 1,
        iconClass: "",
        displayText: "1 1",
        linkUrl: "",
        bgColor: "#2c6bed",
        borderRadius: "4px",
        textColor: "#ffffff",
        accentColor: null,
        active: true,
      }}
    />
  </li>
)}
</Draggable> */
}
