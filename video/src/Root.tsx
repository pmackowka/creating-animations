import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { ExplainerDemo } from "./ExplainerDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="ExplainerDemo"
        component={ExplainerDemo}
        durationInFrames={180}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
