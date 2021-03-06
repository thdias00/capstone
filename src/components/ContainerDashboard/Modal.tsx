import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { Words } from "../../assets/words";
import { useRecipes } from "../../contexts/Recipes";
import { theme } from "../../styles/theme";
import { ModalRecipe } from "./ModalRecipe";

interface Recipe {
  id: number;
  title: string;
  serves: number;
  method: string;
  ingredients: string[];
  searchIngredients: string[];
  image: string;
}

export const ModalDashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bgColor, setBgColor] = useState(true);
  const [findIngredient, setFindIngredient] = useState<string[]>([]);
  const [findRecipes, setFindRecipes] = useState<Recipe[]>([]);
  const { recipes } = useRecipes();
  const history = useHistory();

  const handleClick = () => {
    let count = 0;
    let teste = 0;

    recipes.map((recipe) => {
      count = 0;
      findIngredient.map((ingredient) => {
        if (recipe.searchIngredients.includes(ingredient)) {
          count++;
        }
      });
      if (count >= 3) {
        if (!findRecipes.includes(recipe)) {
          setFindRecipes([...findRecipes, recipe]);
          count = 0;
          teste++;
        }
      } else {
        count = 0;
      }
    });
  };

  useEffect(() => {
    handleClick();
  }, [findRecipes]);

  return (
    <>
      <Box
        w={["25px", "25px", "35px", "50px"]}
        h={["25px", "25px", "35px", "50px"]}
        borderRadius={40}
        bg={bgColor ? "#000000" : "#FFFFFF"}
        onMouseOver={() => setBgColor(!bgColor)}
        onMouseOut={() => setBgColor(!bgColor)}
        onClick={onOpen}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        m={3}
      >
        <AiOutlineRight
          size={30}
          color={bgColor ? "#FFFFFF" : theme.colors.secondary}
        />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text
              fontSize={"2xl"}
              fontWeight="700"
              color="primary"
              textTransform="uppercase"
            >
              Find Recipes
            </Text>
          </ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setFindIngredient([]);
            }}
          />
          <ModalBody>
            <Text color={"gray.600"} fontWeight={"bold"} m={3}>
              Escolha 3 ou mais ingredientes:{" "}
            </Text>
            <Flex flexWrap={"wrap"} w={"100%"} justifyContent={"center"}>
              {Words.sort().map((word, index) => (
                <Box
                  key={index}
                  padding={2}
                  m={1}
                  bg={findIngredient.includes(word) ? "primary" : "chardon"}
                  color={findIngredient.includes(word) ? "#FFFFFF" : "gray.600"}
                  borderRadius={10}
                  _hover={{
                    cursor: "pointer",
                    bg: "primary",
                    color: "#FFFFFF",
                  }}
                  onClick={() => setFindIngredient([...findIngredient, word])}
                >
                  {word}
                </Box>
              ))}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex
              w={"100%"}
              flexDir={["column", "column", "row", "row"]}
              justifyContent={["center", "center", "flex-end", "flex-end"]}
              alignItems={"center"}
            >
              <Button
                bg={"#FFFFFF"}
                color={"primary"}
                _hover={{ cursor: "pointer", bg: "#FFFFFF" }}
                m={3}
                boxShadow={[
                  "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  "none",
                  "none",
                ]}
                onClick={() => {
                  setFindIngredient([]);
                  setFindRecipes([]);
                }}
              >
                LIMPAR INGREDIENTES
              </Button>
              <ModalRecipe
                handleClick={handleClick}
                findRecipes={findRecipes}
                findIngredient={findIngredient}
                setFindRecipes={setFindRecipes}
              />
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
