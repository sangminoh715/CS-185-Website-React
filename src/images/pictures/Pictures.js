import hk1 from "./hollowknight1.jpg";
import hk2 from "./hollowknight2.jpg";
import hk3 from "./hollowknight3.jpg";

import celeste1 from "./celeste1.jpg";
import celeste2 from "./celeste2.jpg";
import celeste3 from "./celeste3.png";
import celeste4 from "./celeste4.png";

import ori1 from "./ori1.jpg";
import ori2 from "./ori2.jpg";
import ori3 from "./ori3.jpg";
import ori4 from "./ori4.jpg";

export function getPicture(pictureId) {
  switch(pictureId) {
    default:
    case 0:
      return hk1;
    case 1:
      return hk2;
    case 2:
      return hk3;
    case 3:
      return celeste1;
    case 4:
      return celeste2;
    case 5:
      return celeste3;
    case 6:
      return celeste4;
    case 7:
      return ori1;
    case 8:
      return ori2;
    case 9:
      return ori3;
    case 10:
      return ori4;
  }
}