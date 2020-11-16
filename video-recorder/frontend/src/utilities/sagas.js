import { all } from "redux-saga/effects";
import appSagas from "../App/sagas";
import photoSagas from "../Photo/sagas";
import videoSagas from "../Video/sagas";

export default function* rootSaga() {
  yield all([...appSagas, ...photoSagas, ...videoSagas]);
}
