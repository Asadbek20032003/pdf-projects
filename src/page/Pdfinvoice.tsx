import React, { useState } from "react";
import "./pdfinvoice.scss";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Logo from "./assests/kadastr-logo.svg";
import QrCode from "./assests/image.png";

const PdfInvoice: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPDF = async () => {
    setIsGenerating(true);
    const input = document.getElementById("pdf__content");
    if (input) {
      const canvas = await html2canvas(input, {
        backgroundColor: "#ffffff",
        scale: 2,
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "cm",
        format: [21, 29.7],
        putOnlyUsedFonts: true,
        floatPrecision: 16,
      });

      const imgWidth = 21;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pageHeight = pdf.internal.pageSize.height;
      const scaledHeight = imgHeight > pageHeight ? pageHeight : imgHeight;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, scaledHeight); // Start at (0, 0)

      if (scaledHeight > pageHeight) {
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, scaledHeight - pageHeight);
      }

      pdf.save("invoice.pdf");
    }
    setIsGenerating(false);
  };

  return (
    <div className="pdf__page">
      <div id="pdf__content" className={isGenerating ? "hidden" : "page"}>
        <div className="headers__pdf">
          <div className="head__body">
            <hr style={{ marginBottom: "35px" }} />
            {/* Uzbek tlida malumotlar */}
            <div className="logo__image">
              <div>
                <img alt="kadastr-logo" src={Logo} />
              </div>
              <div>
                <p className="s3 p__tag">
                  Invoys raqami: <b className="s1">14614559170338</b>
                </p>
                <p className="s3">
                  To'lovchi: <b className="s1">YOROV SHERZOD RAXMONOVICH</b>
                </p>
                <h2 className="s3 h2__tag">
                  <span>Invoys sanasi:</span> <b className="s1">23.09.2024</b>
                </h2>
              </div>
            </div>
            <table cellSpacing={0}>
              <tbody>
                <tr>
                  <td className="td__one">
                    <p className="s5 td__one__p ">Kadastr raqami</p>
                  </td>
                  <td className="td__two" colSpan={2}>
                    <p className="s6 td__one__p ">15:04:34:64:4111</p>
                  </td>
                </tr>
                <tr>
                  <td className="td__one">
                    <p className="s5 td__one__p">Xizmat nomi</p>
                  </td>
                  <td className="td__two" colSpan={2}>
                    <p className="s6 td__two__p">
                      O'zboshimchalik bilan egallab olingan yer uchastkasi bino
                      va inshootlarga bo'lgan huquqlarni e’tirof etish
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="td__one">
                    <p className="s5 td__one__p">Qabul qiluvchi</p>
                  </td>
                  <td className="td__two">
                    <p className="s6 td__two__p">Kadastr agentligi</p>
                  </td>
                  <td rowSpan={4} className="td__three">
                    <img src={QrCode} alt="QrCode" className="image___qrcode" />
                  </td>
                </tr>
                <tr>
                  <td className="td__one">
                    <p className="s5 td__one__p">Hisob raqami(g'azna)</p>
                  </td>
                  <td className="td__two">
                    <p className="s6 td__two__p">23402000300100001010</p>
                  </td>
                </tr>
                <tr>
                  <td className="td__one">
                    <p className="s5 td__one__p">Shaxsiy hisobvaraq</p>
                  </td>
                  <td className="td__two">
                    <p className="s6 td__two__p">4014228603062463422372255</p>
                  </td>
                </tr>
                <tr>
                  <td className="td__one">
                    <p className="s5 td__one__p">Miqdori</p>
                  </td>
                  <td className="td__two">
                    <p className="s6 td__two__p">918000</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style={{
                paddingTop: "4pt",
                textIndent: "0pt",
                textAlign: "left",
              }}
            >
              <br />
            </p>
            <div className="info__methods">
              <p className="s1">To‘lovni amalga oshirish usullari:</p>
              <p className="s6">
                1. Elektron to‘lov tizimlarida
                <b>(Upay, Click, Payme va boshqalar) </b>
                invoys raqamini kiritish;
              </p>
              <p className="s6">
                2. Yuridik shaxslar tomonidan
                <b> pul o'tkazish</b> yo'li. Bunda “To'lov maqsadi’’ ga shaxsiy
                hisobvaraq, invoys raqami hamda uning tavsifi kiritiladi, invoys
                reqamidan oldin va keyin bo’shjoy qoldiriladi.
                <b> Na’muna: </b>
              </p>
              <p className="s6">
                40142286012626534°****255 Xorijdan ishchi kuchini jalb qilish va
                undanfoydalanish ruxsatnomasini olishuchun invoys raqami
                (bo’shjoy)708*****S$21054(bo’shjoy).
              </p>
              <p className="s6">
                3. <b>Bank kassalari orqali</b>, Markaziy bankning “MUNIS”
                tizimidagi 204 xizmatga invoys kiritgan holda.
              </p>
            </div>
            <hr style={{ marginTop: "35px", marginBottom: "35px" }} />

            {/* Rus tilida malumotlar */}

            <div className="logo__image">
              <div>
                <img alt="kadastr-logo" src={Logo} />
              </div>
              <div>
                <p className="s3">
                  Номер инвойса: <b className="s1">14614559170338</b>
                </p>
                <p className="s3">
                  Плательщик: <b className="s1">YOROV SHERZOD RAXMONOVICH</b>
                </p>
                <h2 className="s3 h2__tag">
                  Дата инвойса: <b className="s1">23.09.2024</b>
                </h2>
              </div>
            </div>
            <table cellSpacing={0}>
              <tbody>
                <tr>
                  <td className="td__one">
                    <p className="s5 td__one__p ">Номер кадастра</p>
                  </td>
                  <td className="td__two" colSpan={2}>
                    <p className="s6 td__one__p ">15:04:34:64:4111</p>
                  </td>
                </tr>
                <tr>
                  <td className="td__one">
                    <p className="s5 td__one__p">Наименование услуги</p>
                  </td>
                  <td className="td__two" colSpan={2}>
                    <p className="s6 td__two__p">
                      О признании прав на самовольно захваченные земельные
                      участки и построенные на них здания и сооружения
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="td__one">
                    <p className="s5 td__one__p">Получатель</p>
                  </td>
                  <td className="td__two">
                    <p className="s6 td__two__p">Агентство по кадастру</p>
                  </td>
                  <td rowSpan={4} className="td__three">
                    <img src={QrCode} alt="QrCode" className="image___qrcode" />
                  </td>
                </tr>
                <tr>
                  <td className="td__one">
                    <p className="s5 td__one__p">
                      Расчётный счёт (казначейство))
                    </p>
                  </td>
                  <td className="td__two">
                    <p className="s6 td__two__p">23402000300100001010</p>
                  </td>
                </tr>
                <tr>
                  <td className="td__one">
                    <p className="s5 td__one__p">Лицевой счет</p>
                  </td>
                  <td className="td__two">
                    <p className="s6 td__two__p">4014228603062463422372255</p>
                  </td>
                </tr>
                <tr>
                  <td className="td__one">
                    <p className="s5 td__one__p">Сумма</p>
                  </td>
                  <td className="td__two">
                    <p className="s6 td__two__p">918000</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style={{
                paddingTop: "4pt",
                textIndent: "0pt",
                textAlign: "left",
              }}
            >
              <br />
            </p>
            <div className="info__methods">
              <p className="s1">Способы оплаты:</p>
              <p className="s6">
                1. Через платежные системы
                <b> (Upay, Click, Payme и т.д.) </b>
                где необходимо внести только номер инвойса
              </p>
              <p className="s6">
                2. <b>Перечислением денег </b>
                от юридического лица, где необходимо внести лицевой счет,
                описание и номер инвойса заявления в «Деталях платежа» с учётом
                поставки пробела перед и после инвойса
                <b> Например: </b>
              </p>
              <p className="s6">
                40142286012626534°****255 плата за разрешение на привлечение
                иностранной рабочей силы в Республику Узбекистан по номеру
                инвойса (пробел)708*****S$21054(пробел).
              </p>
              <p className="s6">
                3. <b>Через кассу банка</b>,с помощью 204 услуги системы «МУНИС»
                Центрального банка
              </p>
            </div>
          </div>
        </div>
      </div>
      <button onClick={downloadPDF} style={{ marginTop: "20px" }}>
        PDF yuklab olish
      </button>
    </div>
  );
};

export default PdfInvoice;
