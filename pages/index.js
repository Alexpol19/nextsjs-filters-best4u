import HomeContainer from "../components/HomeContainer";
import ErrorMessage from "../ui/ErrorMessage";
import Loader from "../ui/Loader";
import { useCards } from "./api/cards";

export default function Home() {
  const { cardsData, isLoading, isError } = useCards()
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        <HomeContainer cardsData={cardsData} />
      )}
    </div>
  )
}
