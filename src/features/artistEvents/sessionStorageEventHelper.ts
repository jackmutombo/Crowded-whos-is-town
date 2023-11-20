import { ArtistEvent } from '../../models/artistEvent';
import textConstants from '../../utils/textConstants';

export const addEventToSessionStorage = (
  event: ArtistEvent,
  currentFavoriteEvents: ArtistEvent[],
  setToDisplayFavoriteEvent: (event: ArtistEvent[]) => void
) => {
  // Check if the item already exists in the stored array
  const itemExists = currentFavoriteEvents.some(item => item.id === event.id);

  if (itemExists) return;

  const updatedArray = [...currentFavoriteEvents, event];
  updateSessionStorage(updatedArray, setToDisplayFavoriteEvent);
};

export const updateSessionStorage = (
  updatedArray: ArtistEvent[],
  setToDisplayFavoriteEvent: (event: ArtistEvent[]) => void
) => {
  const updatedArrayAsString = JSON.stringify(updatedArray);
  sessionStorage.setItem(
    textConstants.artistEvent.sessionKey,
    updatedArrayAsString
  );
  setToDisplayFavoriteEvent(updatedArray);
};

export const removeEventFromSessionStorage = (eventId: string, currentFavoriteEvents: ArtistEvent[], setToDisplayFavoriteEvent:(event: ArtistEvent[]) => void) => {
    const updatedArray = [...currentFavoriteEvents];
    const indexToRemove = updatedArray.findIndex(item => item.id === eventId);

    if (indexToRemove !== -1) {
      updatedArray.splice(indexToRemove, 1);
      updateSessionStorage(updatedArray, setToDisplayFavoriteEvent);
    }
  };

  export const getListFromSessionStorage = (setToDisplayFavoriteEvent: (event: ArtistEvent[]) => void): ArtistEvent[] => {
    const arrayAsString = sessionStorage.getItem(textConstants.artistEvent.sessionKey);
    if (arrayAsString === null) return [];
    const arrayFromStorage = JSON.parse(arrayAsString) || [];
    setToDisplayFavoriteEvent(arrayFromStorage);
    return arrayFromStorage;
  };