import Image from "next/image";
import { Wave } from "better-react-spinkit";

function LoadingScreen() {
  return (
    <div className="grid place-items-center">
      <div className="bg-gray-100 border rounded-3xl p-10 mt-40 ml-12 mr-12 shadow-lg">
        <Image
          src="/network.png"
          height={300}
          width={300}
          loading="eager"
          objectFit="contain"
        />
        <div className="grid place-items-center mt-8">
          <Wave color="#8051f1" size={60} />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
