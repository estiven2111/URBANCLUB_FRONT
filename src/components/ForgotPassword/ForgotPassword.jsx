import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import style from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const [input, setInput] = useState({
    email: "",
  });

  const changeHandler = (e) => {
    setInput({
      email: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (input.email === "") {
      swal({
        title: "Campo vacío",
        text: "Por favor, ingresa tu correo electrónico.",
        icon: "error",
        buttons: "Aceptar",
      });
      return;
    }

    try {
      // Aquí debes hacer la llamada a la API para verificar si el correo electrónico existe
      const response = await axios.put("/artist/forgotPassword", input);

      // Si el correo electrónico no existe, puedes mostrar una alerta
      if (response.data.emailExists === false) {
        swal({
          title: "Correo electrónico inválido",
          text: "El correo electrónico ingresado no existe.",
          icon: "error",
          buttons: "Aceptar",
        });
        return;
      }

      // Si el correo electrónico existe y la solicitud fue exitosa
      setInput({
        email: "",
      });
      swal({
        title: "Recuperación de contraseña",
        text: "Se ha enviado el correo electrónico",
        icon: "success",
        buttons: "Aceptar",
      });
    } catch (error) {
      // Manejo de errores de la llamada a la API
      console.error(error);
      swal({
        title: "Error",
        text: "Ocurrió un error al enviar la solicitud.",
        icon: "error",
        buttons: "Aceptar",
      });
    }
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={submitHandler}>
        <label className={style.label}>Ingresa tu correo electrónico</label>
        <input
          className={style.input}
          type="text"
          name="email"
          value={input.email}
          onChange={changeHandler}
        />
        <button className={style.newPasswordButton} type="submit">
          Recuperar contraseña
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;