import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
// import LaunchItem from './LaunchItem'

const LAUNCHES_QUERY = gql`
    query LauncherQuery{
    launches{
        flight_number
        mission_name
        launch_date_local
        launch_success
    }
}
`

class Launches extends Component {
    render() {
        return (
            <div>
                <h1 className="display-4 my-3">Launcher</h1>
                <Query query={LAUNCHES_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return <h4>Loading...</h4>
                        if (error) console.log("error");

                        console.log(data.launches);

                        return (
                            <>
                                <h3>aa</h3>
                                {
                                    data.launches.map(launch => (
                                        <h4 key={`${launch.flight_name}`}>aaa</h4>
                                        // <LaunchItem key={launch.flight_number} launch={launch} />
                                    ))
                                }
                            </>
                        )

                    }}
                </Query>
            </div>
        )
    }
}

export default Launches