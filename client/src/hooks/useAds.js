import { useQuery } from 'react-query';
import { getAd, countUp } from '../services/ads';

export function useAd(id) {
    return useQuery("ad", async () => {
        const data = await getAd(id);
        await countUp(id);
        return data;
    })
};