import { Link } from "react-router";
import Nintendo from "../assets/images/platforms/NintendoIcon.svg";
import PcIcon from "../assets/images/platforms/PcIcon.svg";
import PlaystationIcon from "../assets/images/platforms/PsIcon.svg";
import xboxIcon from "../assets/images/platforms/XboxIcon.svg";

interface buttonsType {
  pc: string;
  xbox: string;
  playstation: string;
  nintendo: string;
}

interface PlatformIdsType {
  pc: number[];
  xbox: number[];
  playstation: number[];
  nintendo: number[];
}

function ButtonsPlatform() {
  const platforms: buttonsType = {
    pc: PcIcon,
    xbox: xboxIcon,
    playstation: PlaystationIcon,
    nintendo: Nintendo,
  };

  const platformIds: PlatformIdsType = {
    pc: [1, 4, 6, 40849, 5, 31, 40847, 21, 8],
    xbox: [14],
    playstation: [3],
    nintendo: [7],
  };

  return (
    <div className="buttons-platform">
      <div className="button-playstation">
        <Link to={`/categories/${platformIds.playstation.join(",")}`}>
          <img src={platforms.playstation} alt="playstation" />
        </Link>
        <h3>playstation</h3>
      </div>

      <div className="button-xbox">
        <Link to={`/categories/${platformIds.xbox}`}>
          <img src={platforms.xbox} alt="xbox" />
        </Link>
        <h3>xbox</h3>
      </div>

      <div className="button-pc">
        <Link to={`/categories/${platformIds.pc}`}>
          <img src={platforms.pc} alt="pc" />
        </Link>
        <h3>pc</h3>
      </div>

      <div className="button-nintendo">
        <Link to={`/categories/${platformIds.nintendo}`}>
          <img src={platforms.nintendo} alt="nintendo" />
        </Link>
      </div>
    </div>
  );
}

export default ButtonsPlatform;
