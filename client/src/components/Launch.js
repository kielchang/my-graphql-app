import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import classnames from "classnames";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

export class Launch extends Component {
  render() {
    let { flight_number } = this.props.match.params;
    flight_number = parseInt(flight_number);
    return (
      <div>
        <p>{flight_number}</p>
        <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
          {({ loading, error, data }) => {
            if (loading) return <h1>Loading...</h1>;
            if (error) return <p>{`${error}`}</p>;

            const {
              mission_name,
              flight_number,
              launch_year,
              launch_success,
              rocket: { rocket_id, rocket_name, rocket_type }
            } = data.launch;
            console.log(data);

            return (
              <>
                <h1 className="display-4 my-3">
                  <span className="text-dark">Mission: </span>
                  {mission_name}
                </h1>
                <h4 className="mb-3">Launch Details</h4>
                <ul className="list-group-item">
                  <li className="list-group-item">Flight Number: {flight_number}</li>
                  <li className="list-group-item">Launch Year: {launch_year}</li>
                  <li className="list-group-item">
                    Launch Successful:{" "}
                    <span
                      className={classnames({
                        "text-success": launch_success,
                        "text-danger": !launch_success
                      })}
                    >
                      {launch_success ? "Yes" : "No"}
                    </span>
                  </li>
                </ul>

                <h4 className="my-3">Rocket Details</h4>
                <ul className="list-group">
                  <li className="list-group-item">Rocket ID: {rocket_id}</li>
                  <li className="list-group-item">Rocket Name: {rocket_name}</li>
                  <li className="list-group-item">Rocket Type: {rocket_type}</li>
                </ul>
                <hr />
                <Link to="/" className="btn">
                  Back
                </Link>
              </>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Launch;
