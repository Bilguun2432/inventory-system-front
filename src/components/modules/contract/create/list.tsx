import React from "react";

interface FormProps {
  data: any;
}

export default function ContractList(props: FormProps) {
  const { data } = props;
  React.useEffect(() => {
    const canvas = document.getElementById(
      "signatureCanvas",
    ) as HTMLCanvasElement;
    const clearButton = document.getElementById(
      "clearButton",
    ) as HTMLButtonElement;
    const save_signature_image = document.getElementById(
      "save_signature_image",
    ) as HTMLButtonElement;
    const signatureInputs = document.querySelectorAll(
      ".customer_signature",
    ) as NodeListOf<HTMLImageElement>;
    const modal_overlay = document.querySelector(
      ".modal_overlay",
    ) as HTMLElement;
    const modal = document.querySelector(".modal") as HTMLElement;
    const idFront = document.querySelector("#id_front_img") as HTMLImageElement;
    const idBack = document.querySelector("#id_back_img") as HTMLImageElement;
    const annex_input = document.querySelector(
      "#annex_input",
    ) as HTMLInputElement;
    const button_verify = document.querySelector(
      ".button_verify",
    ) as HTMLElement;
    const id_front_image_background = document.querySelector(
      "#id_front_image_background",
    ) as HTMLElement;
    const id_back_image_background = document.querySelector(
      "#id_back_image_background",
    ) as HTMLElement;
    const customer_id = document.querySelector(
      "#customer_id",
    ) as HTMLInputElement;
    const customer_number = document.querySelector(
      "#customer_number",
    ) as HTMLInputElement;
    const document_type = document.querySelector(
      "#document_type",
    ) as HTMLInputElement;
    const base_url = document.querySelector("#base_url") as HTMLInputElement;

    const verify_modal_overlay = document.querySelector(
      ".verify_modal_overlay",
    ) as HTMLElement;
    const verfiy_modal = document.querySelector(".verfiy_modal") as HTMLElement;
    const verify_modal_content = document.querySelector(
      ".verify_modal_content",
    ) as HTMLElement;
    const upload_or_delete_modal_overlay = document.querySelector(
      ".upload_or_delete_modal_overlay",
    ) as HTMLElement;
    const upload_or_delete_modal = document.querySelector(
      ".upload_or_delete_modal",
    ) as HTMLElement;
    const upload_or_delete_modal_content = document.querySelector(
      ".upload_or_delete_modal_content",
    ) as HTMLElement;
    const upload_image = document.querySelector("#upload_image") as HTMLElement;
    const delete_image = document.querySelector("#delete_image") as HTMLElement;
    const save_data_button = document.querySelector(
      "#save_data_button",
    ) as HTMLButtonElement;
    const no_button = document.querySelector(".no_button") as HTMLElement;
    const chose_id_card = document.querySelector(
      ".chose_id_card",
    ) as HTMLElement;
    const chose_annex = document.querySelector(".chose_annex") as HTMLElement;
    const id_card_container = document.querySelector(
      ".id_card_container",
    ) as HTMLElement;
    const annex_container = document.querySelector(
      ".annex_container",
    ) as HTMLElement;
    const annex_image_background = document.querySelector(
      "#annex_image_background",
    ) as HTMLElement;
    const chosen_annex_type_button = document.querySelectorAll(
      "#chosen_annex_type_button",
    ) as NodeListOf<HTMLElement>;

    const modal_overlay_background = document.querySelectorAll(
      "#modal_overlay_background",
    ) as NodeListOf<HTMLElement>;
    const image_container_background = document.querySelectorAll(
      ".image_container_background",
    ) as NodeListOf<HTMLElement>;
    const image_inputs = document.querySelectorAll(
      ".image_input",
    ) as NodeListOf<HTMLInputElement>;

    const chosen_annex_type_enum = {
      id_card: "id_card",
      annex_data: "annex_data",
    };

    const upload_data = "_contract/upload-personal-data";
    const get_all_documents_pdf = "_contract/get-all-documents-pdf";

    const sendData: any = {
      customer_id: customer_id?.value,
      customer_number: customer_number?.value,
      signature: signatureInputs[0]?.src.includes("default")
        ? ""
        : signatureInputs[0]?.src,
      front: idFront?.getAttribute("value"),
      back: idBack?.getAttribute("value"),
      annex_data: annex_input?.getAttribute("value"),
      document_type: document_type?.getAttribute("value"),
    };

    signatureInputs.forEach((input) => {
      if (input.src.includes("default")) {
        sendData.signature = "";
        return;
      }
    });

    const chosen_annex_type =
      sendData.annex_data != ""
        ? chosen_annex_type_enum.annex_data
        : chosen_annex_type_enum.id_card;

    const handleImageInput = (
      e: {
        e: ProgressEvent<FileReader>;
        target: FileReader | null;
      },
      background_ele: HTMLElement,
      sendData_value: string,
    ) => {
      const file = (e.target as any).files[0];
      const filename = file.name.split(".").pop().toLowerCase();

      if (filename == "jpg" || filename == "png") {
        const reader = new FileReader();
        reader.onload = function (e) {
          background_ele.textContent = "";
          background_ele.style.backgroundSize = "contain";
          background_ele.style.backgroundRepeat = "no-repeat";
          background_ele.style.backgroundPosition = "center center";
          background_ele.style.backgroundImage = `url(${e.target?.result})`;
          sendData[sendData_value] = e.target?.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert("Зөвхөн jpg, png зураг оруулах боломжтой");
        return;
      }
    };

    signatureInputs.forEach((input) => {
      input.addEventListener("click", (e) => {
        document.body.style.overflow = "hidden";
        modal_overlay.style.display = "flex";
      });
    });

    save_signature_image?.addEventListener("click", (e) => {
      const image = canvas.toDataURL("image/png");
      signatureInputs.forEach((input) => {
        if (input.getAttribute("name") == "disable") {
          input.src = image;
        }
      });
      sendData.signature = image;
      modal_overlay.style.display = "none";
      document.body.style.overflow = "auto";
    });

    no_button?.addEventListener("click", () => {
      verify_modal_overlay.style.display = "none";
      document.body.style.overflow = "auto";
    });

    const is_all_data_filled = () => {
      const obj: {
        customer_id: string;
        customer_number: string;
        signature: string;
        front: string;
        back: string;
        annex_data: string;
        [key: string]: string | null;
      } = {
        customer_id: "Хэрэглэгчийн ID",
        customer_number: "Хэрэглэгчийн дугаар",
        signature: "Гарын үсэг",
        front: "Иргэний үнэмлэхийн нүүрний зураг",
        back: "Иргэний үнэмлэхийн ар талын зураг",
        annex_data: "Хавсралтын мэдээлэл",
      };

      const obj_id_card: {
        signature: string;
        front: string | null;
        back: string | null;
        [key: string]: string | null;
      } = {
        signature: sendData.signature,
        front: sendData.front,
        back: sendData.back,
      };

      const obj_annex_data: {
        signature: string;
        annex_data: string | null;
        [key: string]: string | null;
      } = {
        signature: sendData.signature,
        annex_data: sendData.annex_data,
      };

      if (chosen_annex_type == "annex_data") {
        console.log(chosen_annex_type, obj_annex_data);
        for (const [key, value] of Object.entries(obj_annex_data)) {
          if (obj_annex_data[key] == "") {
            alert(`${obj[key]} хоосон байж болохгүй !!`);
            return false;
          }
        }
      }
      if (chosen_annex_type == "id_card") {
        for (const [key, value] of Object.entries(obj_id_card)) {
          if (obj_id_card[key] == "") {
            alert(`${obj[key]} хоосон байж болохгүй !!`);
            return false;
          }
        }
      }
      return true;
    };

    const upload_image_input = {
      front: idFront,
      back: idBack,
      annex_data: annex_input,
    };

    const upload_image_background = {
      front: id_front_image_background,
      back: id_back_image_background,
      annex_data: annex_input,
    };
  }, [data]);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: data }}></div>
    </>
  );
}
