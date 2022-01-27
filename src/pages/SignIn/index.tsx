import { useAuth } from "../../contexts/Auth";
import { SignInForm } from "./SignInForm";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Image, Link, Text, useDisclosure } from "@chakra-ui/react";
import Decor from "../../assets/plant.png";
import ModalError from "../../components/ModalError"


interface SignInData {
  email: string;
  password: string;
}

export const SignIn = () => {

  const {isOpen, onOpen,onClose} =   useDisclosure()

  const { signIn } = useAuth();

  const SignInSchema = yup.object().shape({
    email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
    password: yup
      .string()
      .required("Campo obrigatório")
      .matches(
        /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "Senha deverá conter no mínimo uma letra minúscula, uma maiúscula, um número, um caractere especial e com o comprimento mínimo de oito caracteres."
      ),
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInData>({
    resolver: yupResolver(SignInSchema),
  });

  const handleSignIn = (data: SignInData) => {
    signIn(data)
      .then((_) => {
        console.log(data);
        // Adicionar toast
      })
      .catch((err) => {
        console.log(err);
        onOpen()
      });
  };


  
  return (
    <Flex
      justifyContent={"flex-start"}
      alignItems={"center"}
      bgGradient={"linear(to-r, bgColor 75%, primary 25%)"}
      h={"100vh"}
    >
      <Flex
        h={"100vh"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        position={["absolute", "relative", "relative", "relative"]}
      >
        <Link href="/" textDecor={"none"} _hover={{ textDecor: "none" }}>
          <Text
            fontSize={["2rem", "2rem", "3rem", "3rem"]}
            margin={"1rem auto auto 1rem"}
            fontWeight="700"
            color="primary"
            textTransform="uppercase"
            lineHeight={["45px", "65px"]}
          >
            Find Recipes
          </Text>
        </Link>
        <Image src={Decor} w={["25vw", "25vw", "10vw", "10vw"]} />
      </Flex>
      <SignInForm
        errors={errors}
        register={register}
        handleSignIn={handleSubmit(handleSignIn)}
      />
      <ModalError isOpen={isOpen} onClose={onClose} signIn />
    </Flex>
  );
};
