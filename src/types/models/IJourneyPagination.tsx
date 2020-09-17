import { IJourneyState } from '~types/models/IJourneyState';

export interface IJourneyPagination {
    journeys: IJourneyState[];
    after?: string;
}
