import { useParams } from "react-router-dom";

export const withParams = (Component) => {
    return props => <Component {...props} params={useParams()} />;
}