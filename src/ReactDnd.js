import { Container, Flex, Heading, List, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useDrop } from "react-dnd";
import Player from "./components/Player";

function ReactDnd() {
  const [players, setPlayer] = useState([
    { name: "Afran" },
    { name: "Saurabh" },
    { name: "Amey" },
    { name: "Nadeem" },
    { name: "Prannoy" },
  ]);

  const [team, setTeam] = useState([]);

  const [{ isOver }, addToTeamRef] = useDrop({
    accept: "player",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  console.log(isOver);
  const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
    accept: "team",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  
  });

  const movePlayerToTeam = (item) => {
    console.log(item);
    setPlayer((prev) => prev.filter((_, i) => i !==  item.index ));
    setTeam((prev) => [...prev, item]);
  };

  const removePlayerFromTeam = (item) => {
    setTeam((prev) => prev.filter((_, i) => i !==  item.index ));
    setPlayer((prev) => [...prev, item]);
  };

// const [{ isOver, dragIndex, hoverIndex }, addToTeamRef] = useDrop({
//     accept: "player",
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//       dragIndex: monitor.getItem() && monitor.getItem().index,
//       hoverIndex: monitor.isOver() ? getHoverIndex(monitor) : null,
//     }),
//   });

//   const [{ isOver: isPlayerOver, dragIndex: teamDragIndex, hoverIndex: teamHoverIndex }, removeFromTeamRef] = useDrop({
//     accept: "team",
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//       dragIndex: monitor.getItem() && monitor.getItem().index,
//       hoverIndex: monitor.isOver() ? getHoverIndex(monitor) : null,
//     }),
//   });

//   const movePlayerToTeam = (item) => {
//     setPlayer((prev) => prev.filter((_, i) => i !==  item.index ));
//     if (hoverIndex === null) {
//       setTeam((prev) => [...prev, item]);
//     } else {
//       setTeam((prev) => {
//         const temp = [...prev];
//         temp.splice(hoverIndex, 0, item);
//         return temp;
//       });
//     }
//   };

//   const removePlayerFromTeam = (item) => {
//     setTeam((prev) => prev.filter((_, i) => i !==  item.index ));
//     if (hoverIndex === null) {
//       setPlayer((prev) => [...prev, item]);
//     } else {
//       setPlayer((prev) => {
//         const temp = [...prev];
//         temp.splice(hoverIndex, 0, item);
//         return temp;
//       });
//     }
//   };

//   const getHoverIndex = (monitor) => {
//     const { index: hoverIndex } = monitor.getTargetBoundingRect();
//     const { clientY } = monitor.getClientOffset();
//     const { height } = monitor.getItemBoundingRect();
//     return clientY < hoverIndex + height / 2 ? hoverIndex : hoverIndex + 1;
//   };

  return (
    <Container maxW="800px">
      <Heading p="2" align="center" color="GrayText">
        React Drag & Drop
      </Heading>

      <Flex justify="space-between" height="90vh" align="center">
        <Stack width="300px">
          <Heading fontSize="3xl" color="yellow.800" textAlign="center">
            PLAYERS
          </Heading>
          <List
           p="4"
           minH="70vh"
           boxShadow="xl"
           borderRadius="md"
           ref={removeFromTeamRef}
           bgGradient={
              isPlayerOver
                ? "linear(to-b, yellow.300, yellow.500)"
                : "linear(to-b, yellow.100, yellow.200)"
            }
          >
            {players.map((e, i) => (
              <Player
                key={e.name}
                item={e}
                type="player"
                index={i}
                onDropPlayer={movePlayerToTeam}
              />
            ))}
          </List>
        </Stack>
        <Stack width="300px">
          <Heading fontSize="3xl" color="teal.800" textAlign="center">
            TEAM
          </Heading>
          <List
            bgGradient={
              isOver
                ? "linear(to-b, teal.300, teal.500)"
                : "linear(to-b, teal.100, teal.200)"
            }
            p="4"
            minH="70vh"
            boxShadow="xl"
            borderRadius="md"
            ref={addToTeamRef}
          >
            {team.map((e, i) => (
              <Player
                key={e.name}
                item={e}
                type="team"
                index={i}
                onDropPlayer={removePlayerFromTeam}
                // handleDrop={() => removeFromTeamRef(e)}
              />
            ))}
          </List>
        </Stack>
      </Flex>
    </Container>
  );
}

export default ReactDnd;


