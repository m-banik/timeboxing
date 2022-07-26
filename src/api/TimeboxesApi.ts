import { Api, ApiConfigType } from './Api';
import { TIMEBOXES_BASE_URL } from './baseUrls';
import { TimeboxesApiType } from '../common/types';
import {
  asssertIsOfTimeboxType,
  asssertAreOfTimeboxType,
} from '../utilities/typeGuards';

export class TimeboxesApi extends Api implements TimeboxesApiType {
  constructor(config: ApiConfigType) {
    super({
      ...config,
      baseUrl: config.baseUrl ? config.baseUrl : TIMEBOXES_BASE_URL,
    });
  }

  public getTimebox: TimeboxesApiType['getTimebox'] = async (
    timeboxId,
    accessToken
  ) =>
    this.requestHandler({
      baseUrl: this.baseUrl,
      accessToken,
      method: 'GET',
      id: timeboxId,
    }).then((result) => {
      asssertIsOfTimeboxType(
        result,
        'Server provided data of an incorrect format!'
      );

      return result;
    });

  public getTimeboxes: TimeboxesApiType['getTimeboxes'] = async (accessToken) =>
    this.requestHandler({
      baseUrl: this.baseUrl,
      accessToken,
      method: 'GET',
    }).then((result) => {
      asssertAreOfTimeboxType(
        result,
        'Server provided data of an incorrect format!'
      );

      return result;
    });

  public getTimeboxesByFullTextSearch: TimeboxesApiType['getTimeboxesByFullTextSearch'] =
    async (searchQuery, accessToken) =>
      this.requestHandler({
        baseUrl: this.baseUrl,
        accessToken,
        method: 'GET',
        phrase: searchQuery,
      }).then((result) => {
        asssertAreOfTimeboxType(
          result,
          'Server provided data of an incorrect format!'
        );

        return result;
      });

  public addTimebox: TimeboxesApiType['addTimebox'] = async (
    addedTimeboxData,
    accessToken
  ) =>
    this.requestHandler({
      baseUrl: this.baseUrl,
      accessToken,
      method: 'POST',
      data: addedTimeboxData,
    }).then((result) => {
      asssertIsOfTimeboxType(
        result,
        'Server provided data of an incorrect format!'
      );
      return result;
    });

  public editTimebox: TimeboxesApiType['editTimebox'] = async (
    editedTimebox,
    accessToken
  ) =>
    this.requestHandler({
      baseUrl: this.baseUrl,
      accessToken,
      method: 'PUT',
      data: editedTimebox,
    }).then((result) => {
      asssertIsOfTimeboxType(
        result,
        'Server provided data of an incorrect format!'
      );
      return result;
    });

  public partiallyUpdateTimebox: TimeboxesApiType['partiallyUpdateTimebox'] =
    async (partiallyUpdatedTimebox, accessToken) =>
      this.requestHandler({
        baseUrl: this.baseUrl,
        accessToken,
        method: 'PATCH',
        data: partiallyUpdatedTimebox,
      }).then((result) => {
        asssertIsOfTimeboxType(
          result,
          'Server provided data of an incorrect format!'
        );
        return result;
      });

  public removeTimebox: TimeboxesApiType['removeTimebox'] = async (
    removedTimeboxId,
    accessToken
  ) =>
    this.requestHandler({
      baseUrl: this.baseUrl,
      accessToken,
      method: 'DELETE',
      id: removedTimeboxId,
    });
}
