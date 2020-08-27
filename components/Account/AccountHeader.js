import { Segment, Icon, Header, Label } from "semantic-ui-react";
import formatDate from "../../utils/formatDate";
function AccountHeader({ role, email, name, createdAt }) {
  return (
    <>
      <Segment inverted color="blue" secondary>
        <Label
          color="yellow"
          size="large"
          ribbon
          icon="privacy"
          style={{ textTransform: "capitalize" }}
          content={role}
        />
      <Header inverted textAlign="center" as="h1" >
        <Icon name="user"> </Icon>
        {name}
        <Header.Subheader>{email}</Header.Subheader>
        <Header.Subheader>Joined : {formatDate(createdAt)}</Header.Subheader>
      </Header>
      
      </Segment>  
    </>
  );
}

export default AccountHeader;
