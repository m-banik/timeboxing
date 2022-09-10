import { Api, ApiConfigType } from '.';
import {
  timeboxesSamples,
  TimeboxType,
  AccessTokenType,
  IdType,
  TimeboxesApiType,
} from '../common';
import { wait } from '../utilities';

export type FakeTimeboxesApiConfigType = ApiConfigType & {
  delayInMiliseconds?: number;
};

export class FakeTimeboxesApi extends Api implements TimeboxesApiType {
  private _delayInMiliseconds = 1000;
  private _timeboxes = timeboxesSamples;

  constructor({ delayInMiliseconds, ...config }: FakeTimeboxesApiConfigType) {
    super(config);

    if (typeof delayInMiliseconds === 'number') {
      this.delayInMiliseconds = delayInMiliseconds;
    }
  }

  public get delayInMiliseconds() {
    return this._delayInMiliseconds;
  }

  public get timeboxes() {
    return this._timeboxes;
  }

  public set delayInMiliseconds(delayInMiliseconds: number) {
    this._delayInMiliseconds = delayInMiliseconds;
  }

  public set timeboxes(timeboxes: TimeboxType[]) {
    this._timeboxes = timeboxes.map((timebox) => ({ ...timebox }));
  }

  private checkAccessToken = (accessToken?: AccessTokenType): void => {
    if (typeof accessToken !== 'string') {
      throw new Error('Invalid token!');
    }
  };

  private getTimeboxIndexById = (searchedId: IdType) =>
    this.timeboxes.findIndex(({ id }) => searchedId === id);

  public getTimebox: TimeboxesApiType['getTimebox'] = async (
    timeboxId,
    accessToken
  ) => {
    await wait(this.delayInMiliseconds);
    this.checkAccessToken(accessToken);

    const searchedTimeboxIndex = this.getTimeboxIndexById(timeboxId);

    if (searchedTimeboxIndex < 0) {
      throw new Error('There is no timebox of such ID!');
    }

    return this.timeboxes[searchedTimeboxIndex];
  };

  public getTimeboxes: TimeboxesApiType['getTimeboxes'] = async (
    accessToken
  ) => {
    await wait(this.delayInMiliseconds);
    this.checkAccessToken(accessToken);

    return this.timeboxes.map((timebox) => ({ ...timebox }));
  };

  public getTimeboxesByFullTextSearch: TimeboxesApiType['getTimeboxesByFullTextSearch'] =
    async (searchQuery, accessToken) => {
      await wait(this.delayInMiliseconds);
      this.checkAccessToken(accessToken);

      const timeboxesByFullTextSearch = this.timeboxes.filter(({ title }) =>
        title.includes(searchQuery)
      );

      return timeboxesByFullTextSearch;
    };

  public addTimebox: TimeboxesApiType['addTimebox'] = async (
    addedTimeboxData,
    accessToken
  ) => {
    await wait(this.delayInMiliseconds);
    this.checkAccessToken(accessToken);

    const customId = Math.floor(
      Math.random() * 1000000000000 + this.timeboxes.length
    );

    const addedTimebox = { ...addedTimeboxData, id: customId };
    this.timeboxes.push({ ...addedTimebox });

    return addedTimebox;
  };

  public editTimebox: TimeboxesApiType['editTimebox'] = async (
    editedTimebox,
    accessToken
  ) => {
    await wait(this.delayInMiliseconds);
    this.checkAccessToken(accessToken);

    const editedTimeboxIndex = this.getTimeboxIndexById(editedTimebox.id);

    if (editedTimeboxIndex < 0) {
      throw new Error('There is no timebox of such ID!');
    }

    this.timeboxes[editedTimeboxIndex] = { ...editedTimebox };

    return editedTimebox;
  };

  public partiallyUpdateTimebox: TimeboxesApiType['partiallyUpdateTimebox'] =
    async (timeboxToUpdate, accessToken) => {
      await wait(this.delayInMiliseconds);
      this.checkAccessToken(accessToken);

      if (!timeboxToUpdate.id) {
        throw new Error('The provided timebox object has no ID key included!');
      }

      const editedTimeboxIndex = this.getTimeboxIndexById(timeboxToUpdate.id);

      if (editedTimeboxIndex < 0) {
        throw new Error('There is no timebox of such ID!');
      }

      const updatedTimebox = {
        ...this.timeboxes[editedTimeboxIndex],
        ...timeboxToUpdate,
      };

      this.timeboxes[editedTimeboxIndex] = { ...updatedTimebox };

      return updatedTimebox;
    };

  public removeTimebox: TimeboxesApiType['removeTimebox'] = async (
    removedTimeboxId,
    accessToken
  ) => {
    await wait(this.delayInMiliseconds);
    this.checkAccessToken(accessToken);

    const removedTimeboxIndex = this.getTimeboxIndexById(removedTimeboxId);

    if (removedTimeboxIndex < 0) {
      throw new Error('There is no timebox of such ID!');
    }

    const removedTimebox = this.timeboxes.splice(removedTimeboxIndex, 1)[0];

    return removedTimebox;
  };
}
