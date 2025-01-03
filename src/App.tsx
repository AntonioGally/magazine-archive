import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";

function App() {

  async function test() {
    const querySnapshot = await getDocs(collection(db, "magazine"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`, doc.data());
    });
  }

  return (
    <>
      <h1 onClick={test} className="text-3xl font-bold underline">
        Test it
      </h1>
    </>
  )
}

export default App
