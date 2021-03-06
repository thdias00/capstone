import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  useDisclosure,
} from "@chakra-ui/react";

import { usePublication } from "../../../contexts/Publication";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiPlus } from "react-icons/fi";
import { PublicationForm } from "./PublicationForm";
import { useAuth } from "../../../contexts/Auth";

interface PublicationData {
  category: string;
  description: string;
}

export const CreatePubliModal = () => {
  const { user } = useAuth();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { addPublication } = usePublication();


  const PublicationShema = yup.object().shape({
    description: yup.string().required("Campo obrigatório"),
    category: yup.string().required("Campo obrigatório"),
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<PublicationData>({
    resolver: yupResolver(PublicationShema),
  });

  const handlePublication = async (data: PublicationData) => {
    const userId = parseInt(user.id, 10);

    const dataRequest = {
      ...data,
      icon: user.profile,
      userId: userId,
      username: user.username,
    };

    addPublication(dataRequest, onClose);
    
  };

  return (
    <>
      <Box
        bgSize="30px"
        onClick={() => onOpen()}
        _hover={{ cursor: "pointer" }}
      >
        <FiPlus />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mr="10px" textAlign="center">O que deseja compartilhar?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PublicationForm
              errors={errors}
              register={register}
              handlePublication={handleSubmit(handlePublication)}
            />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
