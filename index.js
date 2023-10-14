const AddHidehelperFunction = (id) => {
  const val = document.querySelector(`.${id}`);
  const isTHere = val.classList.contains("hide");
  if (!isTHere) {
    val.classList.remove("show");
    val.classList.add("hide");
  }
};

const AddShowHelperFunction = (id) => {
  const val = document.querySelector(`.${id}`);
  const isTHere = val.classList.contains("show");
  if (!isTHere) {
    val.classList.remove("hide");
    val.classList.add("show");
  }
};

const HideAll = () => {
  AddHidehelperFunction("error");
  AddHidehelperFunction("airtel");
  AddHidehelperFunction("mtn");
  AddHidehelperFunction("glo");
  AddHidehelperFunction("etisalat");
  AddHidehelperFunction("loading");
};

const numberFormatter = () => {
  let number = phone_number.value.trim();
  let splittedNum = number.split("");
  const country_code = splittedNum.slice(1, 4).join("");
  if (!(country_code === "+234") && splittedNum[0] === "0") {
    let spliced_number = splittedNum.slice(1);
    number = `+234` + spliced_number.join("");
  }

  if (number.length !== 14) {
    HideAll();
    AddShowHelperFunction("error");
    return;
  }
  const serverNum = number.replace("+234", "0");
  return serverNum;
};

const UIHelper = (provider) => {
  switch (provider) {
    case "mtn":
      HideAll();
      AddShowHelperFunction("mtn");
      break;
    case "airtel":
      HideAll();
      AddShowHelperFunction("airtel");
      break;
    case "globacom":
      HideAll();
      AddShowHelperFunction("glo");
      break;
    case "emerging":
      HideAll();
      AddShowHelperFunction("etisalat");
      break;
    default:
      HideAll();
      AddHidehelperFunction("error");
      break;
  }
};

const submitHandlerJs = async () => {
  HideAll();
  AddShowHelperFunction("loading");
  let serverNum = numberFormatter();

  const url = `
  http://apilayer.net/api/validate?access_key=c9cf00dd7e688408147c0b36685f39d9&number=${serverNum}&country_code=NG&format=1`;
  try {
    const res = await fetch(url);
    const result = await res.json();
    const provider = result.carrier.split(" ")[0];

    if (formatter.value !== "#") {
      if (provider.toLowerCase() !== formatter.value.trim().toLowerCase()) {
        HideAll();
        AddShowHelperFunction("error");
        return;
      }
    }
    UIHelper(provider.toLowerCase());
  } catch (error) {
    console.log(error);
  }
};

submitHandler.addEventListener("click", submitHandlerJs);

phone_number.addEventListener("focus", () => {
  HideAll();
});
