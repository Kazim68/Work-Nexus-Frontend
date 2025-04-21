import React from 'react'
import Layout from '../Layout/Layout'
import TokenResolve from './TokenResolve'
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { fetchAll } from '../../Api/Api';

const HRDashboard = () => {
    const { data } = useSelector((state) => state.user);

    // Fetching data using React Query
    const { data: tokens, isLoading:tokensLoading, error:tokensError} = useQuery({
        queryKey: ["get_all_tokens"],
        queryFn: () =>
            fetchAll("/token/getAllTokens", {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            }),
        staleTime: 0,
        cacheTime: 0,
    });


    return (
        <Layout>
            <TokenResolve tokens={tokens} />
        </Layout>
    )
}

export default HRDashboard
