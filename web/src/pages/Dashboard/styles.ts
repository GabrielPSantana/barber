import styled from "styled-components";

export const DashboardContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 2.2em;
    margin-bottom: 0.2em;
    margin-top: 1em;
  }

  p {
    color: #aaa;
    margin-bottom: 1em;
  }
  
  .noposts {
    text-align: center;
  }

  .noposts p {
    margin-bottom: 1.5em;
  }

  .noposts a {
    padding: 10px 25px;
  }

  .post_header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    border-bottom: 2px solid #ccc;
    width: 80%;
    padding: 10px;
    font-size: 1.2em;
  }

  .span {
    margin-right: 10px;
  }

  .post_row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    width: 80%;
    padding: 10px;
  }

  .post_row p {
    color: #000;
  }

  .post_row button,
  .post_row a {
    margin: 0 5px;
    height: 30px;
    width: 100px;
    font-size: 0.7em;
  }

  /* =============MEDIA QUERIES (MEDIUM DEVICES) =============*/
  /* @media screen and (max-width: 1024px) {
  }

  @media screen and (max-width: 600px) {
    .post_row {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      width: 90%;
      padding: 10px;
    }

    .post_header {
      display: none;
    }

    .dashboard {
      width: 100%;
    }

    .dashboard > p {
      margin-top: 0;
      margin-bottom: -0.5rem;
      font-size: 1.5rem;
    } */
`;
