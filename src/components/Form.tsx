// import descr from "./descr.json";
// import data from "./data.json";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { IData, IDescr } from "./form.interfaces";
import "./Form.css";

export const Form = () => {
  const { register, handleSubmit } = useForm();

  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState<IData[]>();
  const [descr, setDescr] = useState<IDescr[]>();

  const onSubmit = async (formData) => {
    try {
      const dataResponse = await axios.get(formData.data);
      const descrResponse = await axios.get(formData.descr);
      setIsSubmit(true);
      setData(dataResponse.data);
      setDescr(descrResponse.data);
    } catch (error) {
      alert("Ошибка при введении данных");
    }
  };

  return (
    <div className="container">
      <form className="form" id="descr" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="descr">URL "Описание формы"</label>
        <input className="input" {...register("descr")} />
        <label htmlFor="data">URL "Данные"</label>{" "}
        <input className="input" {...register("data")} />
        <button className="button" type="submit">
          Построить форму
        </button>
      </form>
      {isSubmit && (
        <form className="form">
          {descr &&
            descr.map((item: any) => {
              for (let i = 0; data && i < data.length; i++) {
                const dataItem = data[i];
                if (item.id === dataItem.id) {
                  switch (item.type) {
                    case "input":
                      return (
                        <>
                          <label>{item.placeholder}</label>
                          <input
                            className="input"
                            key={item.id}
                            type={item.dataType}
                            defaultValue={dataItem.value}
                          />
                        </>
                      );
                    case "select":
                      return (
                        <>
                          <label>{item.placeholder}</label>
                          <select className="input" name={item.placeholder}>
                            {item.options &&
                              item.options.map((option: any) => {
                                if (dataItem.value === option.value) {
                                  return (
                                    <option key={option.id} selected>
                                      {option.value}
                                    </option>
                                  );
                                } else {
                                  return (
                                    <option key={option.id}>
                                      {option.value}
                                    </option>
                                  );
                                }
                              })}
                          </select>
                        </>
                      );
                    default:
                      break;
                  }
                }
              }
            })}
        </form>
      )}
    </div>
  );
};
