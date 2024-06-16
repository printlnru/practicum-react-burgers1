import style from "./feeds-page.module.css";

import {Feeds} from "../../components/feeds/feeds";
import FeedsOrderBoard from "../../components/feeds-order-board/feeds-order-board";


export default function FeedsPage() {
  return (
    <div className={style.center}>
      <div className={style.col1}>
        <Feeds />
      </div>
      <div className={style.col2}>
        <FeedsOrderBoard />
      </div>
    </div>
  );
}
