import { ListItem } from "@chakra-ui/react";
import React from "react";
import { useDrag } from "react-dnd";

const Player = ({ item, type, onDropPlayer, index }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: type,
    item: () => ({ ...item, index }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        onDropPlayer(item);
      }
    },
    collect: (monitor) => ({
      isDragging:!! monitor.isDragging(),
    }),
  });

  return (
    <ListItem
      p="2"
      borderRadius="md"
      boxShadow="md"
      mb="2"
      textAlign="center"
      ref={dragRef}
      bg={
        isDragging ? (type === "player" ? "yellow.600" : "teal.400") : "white"
      }
      color={isDragging ? "white" : "black"}
    >
      {item.name}
    </ListItem>
  );
};

export default Player;

// import { ListItem, Box } from "@chakra-ui/react";
// import React, { useRef } from "react";
// import { useDrag } from "react-dnd";

// const Player = ({ item, type, players, onDropPlayer, index }) => {
//   const [{ isDragging }, dragRef] = useDrag({
//     type: type,
//     item: () => ({ ...item, index }),
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   });

//   const listRef = useRef(null);

//   const calculateDropIndex = (x, y) => {
//     const listRect = listRef.current.getBoundingClientRect();
//     const listItemRects = Array.from(listRef.current.children).map((child) =>
//       child.getBoundingClientRect()
//     );
//     const listItemMidpoints = listItemRects.map(
//       (rect) => rect.left + rect.width / 2 - listRect.left
//     );
//     const closestIndex = listItemMidpoints.reduce((acc, curr, idx) => {
//       if (curr < x - listRect.left) {
//         return idx + 1;
//       } else {
//         return acc;
//       }
//     }, 0);
//     return closestIndex;
//   };

//   const handleDrop = (x, y) => {
//     const dropIndex = calculateDropIndex(x, y);
//     const newPlayers = [...players];
//     newPlayers.splice(dropIndex, 0, item);
//     onDropPlayer(newPlayers);
//   };

//   return (
//     <Box ref={listRef}>
//       <ListItem
//         p="2"
//         borderRadius="md"
//         boxShadow="md"
//         mb="2"
//         textAlign="center"
//         ref={dragRef}
//         bg={isDragging ? (type === "player" ? "yellow.600" : "teal.400") : "white"}
//         color={isDragging ? "white" : "black"}
//         onMouseUp={(event) => {
//           handleDrop(event.clientX, event.clientY);
//         }}
//       >
//         {item.name}
//       </ListItem>
//     </Box>
//   );
// };

// export default Player;

