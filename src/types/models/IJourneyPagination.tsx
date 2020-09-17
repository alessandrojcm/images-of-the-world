import { IJourneyState } from '~types/models/IJourneyState';
import { IJourneyUser } from '~types/props';

export type FinishedJourney = IJourneyState & { user: IJourneyUser };

export interface IJourneyPagination {
    journeys: Array<FinishedJourney>;
    after?: string;
    before?: string;
    items: number;
}
