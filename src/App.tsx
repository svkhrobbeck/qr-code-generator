import cx from "classnames";
import { useState } from "react";
import QRCode from "react-qr-code";
import { Scanner as QrReader, type IDetectedBarcode } from "@yudiel/react-qr-scanner";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [qrValue, setQrValue] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState<"generate" | "scan">("generate");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setQrValue(inputValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (qrValue) setQrValue(null);
  };

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    const firstCode = detectedCodes[0];
    if (!firstCode) return;

    setQrValue(firstCode.rawValue);
    console.log("Detected codes:", detectedCodes);
  };

  return (
    <main className="main-content">
      <div className={cx("card", { active: qrValue })}>
        <header className="card__header">
          <h2 className="card__title">QR Code Tool</h2>
          <p className="card__text">Quyidagilardan birini tanlang</p>
        </header>

        <div className="tabs">
          <button className={cx("tabs__btn", { "tabs__btn--active": tabValue === "generate" })} onClick={() => setTabValue("generate")}>
            QR kod yaratish
          </button>
          <button className={cx("tabs__btn", { "tabs__btn--active": tabValue === "scan" })} onClick={() => setTabValue("scan")}>
            QR kodni skaner qilish
          </button>
        </div>

        <div className="card__inner">
          {/* GENERATE */}
          <div className={cx("card__tab", { activeTab: tabValue === "generate" })}>
            <form className="card__form form" onSubmit={handleSubmit}>
              <input className="form__input" type="text" value={inputValue} onChange={handleInputChange} placeholder="Matn yoki URL kiriting" autoComplete="off" />
              <button className="form__btn form__btn--blue" type="submit" disabled={!inputValue.trim()}>
                Yaratish
              </button>
            </form>

            <div className={cx("card__qr-code", { active: qrValue })}>{qrValue && <QRCode className="card__qr-img" value={qrValue} size={260} />}</div>
          </div>

          {/* SCAN */}
          <div className={cx("card__tab", { activeTab: tabValue === "scan" })}>
            <form
              className="card__form form"
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              {qrValue && <input className="form__input" disabled type="text" value={qrValue || ""} placeholder="Matn yoki URL kiriting" autoComplete="off" />}
              <button
                className="form__btn form__btn--red"
                type="button"
                onClick={() => {
                  setInputValue("");
                  setQrValue(null);
                }}
              >
                Tozalash
              </button>
            </form>

            {!qrValue && <QrReader onScan={handleScan} onError={error => console.error(error)} constraints={{ facingMode: "environment" }} />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
