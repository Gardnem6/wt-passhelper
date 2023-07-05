import { useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import dayjs from "dayjs";

import "./App.css";
import NumberDisplayCard from "./components/NumberDisplayCard";
import NumberInput from "./components/NumberInput";
import { setNumberInput } from "./helpers/setNumberInput";
import { loginsToLevel, loginsToLevelReadable } from "./helpers/loginsToLevel";
import { pointsFromLogins } from "./helpers/pointsFromLogins";

function App() {
  const [bpLevel, setBpLevel] = useState(0);
  const [levelProgress, setLevelProgress] = useState(0);
  const [loginCount, setLoginCount] = useState(0);
  const [challengeCount, setChallengeCount] = useState(0);
  const [goalLevel, setGoalLevel] = useState(0);

  const dateFormat = "MMMM D, YYYY";
  const lastDay = dayjs(new Date(2023, 6, 26));
  const daysRemaining = lastDay.diff(dayjs(), "day");
  const totalDays = 91;
  const totalPoints = bpLevel * 10 + levelProgress;
  const pointsForEasy = 2;
  const pointsForMedium = 3;
  const premiumPoints = 150;

  const colClass = "mb-4";
  const cardClass = "h-100";

  const pointsFromChallenges = challengeCount * 30;

  const otherPoints = Math.max(
    totalPoints - pointsFromLogins(loginCount) - pointsFromChallenges,
    0
  );

  const possiblePointsLogins = pointsFromLogins(daysRemaining);
  const possiblePointsEasy = daysRemaining * pointsForEasy;
  const possiblePointsMed = daysRemaining * pointsForMedium;

  const possibleLevelsLogins = bpLevel + possiblePointsLogins / 10;
  const possibleLevelsLoginsEasy =
    bpLevel + Math.round(possiblePointsLogins + possiblePointsEasy) / 10;
  const possibleLevelsLoginsEasyMed =
    bpLevel +
    Math.round(possiblePointsLogins + possiblePointsEasy + possiblePointsMed) /
      10;

      const possibleLevelsLoginsEasyMedBp = possibleLevelsLoginsEasyMed + (premiumPoints / 10);

  return (
    <Container className="wt-passmaster py-4">
      <h1 className="h3 text-light mb-3">WT Battlepass Calculator</h1>
      <p className="text-light mb-4">
        For Battlepass XI, "Her Majesty's Hussar" ending{" "}
        {lastDay.format(dateFormat)}
      </p>
      <p className="text-light mb-4">
        The numbers you need to enter in the "Battlepass Progress" card should
        be visible in-game on the Battlepass progress screen. If you have any
        feature suggestions, or you find a bug, I encourage you to open an issue
        on <a href="https://github.com/Gardnem6/wt-passhelper/issues">GitHub</a>
        . I'll do my best to take care of issues.
      </p>
      <Row>
        <Col className={colClass} md="auto">
          <NumberDisplayCard title="Battlepass Days Remaining" pClassName="h1">
            {daysRemaining}
          </NumberDisplayCard>
        </Col>
        <Col className={colClass}>
          <Card className={cardClass}>
            <Card.Header>Battlepass Progress</Card.Header>
            <Card.Body className="d-flex flex-wrap gap-4 justify-content-around">
              <NumberInput
                label="Current Battlepass Level"
                callback={setBpLevel}
                value={bpLevel.toString()}
              />
              <NumberInput
                label="Points Towards Next Level"
                callback={setLevelProgress}
                value={levelProgress.toString()}
              />
              <NumberInput
                label="This Season's Logins"
                callback={setLoginCount}
                value={loginCount.toString()}
              />
              <NumberInput
                label="Challenge Progress"
                callback={setChallengeCount}
                value={challengeCount.toString()}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col className="mb-4 mb-md-0">
          <NumberDisplayCard title="Levels From Logins">
            {pointsFromLogins(loginCount) / 10}
          </NumberDisplayCard>
        </Col>
        <Col className="mb-4 mb-md-0">
          <NumberDisplayCard title="Levels From Challenges">
            {pointsFromChallenges / 10}
          </NumberDisplayCard>
        </Col>
        <Col className="mb-4 mb-md-0">
          <NumberDisplayCard title="Levels From Daily and Special Tasks">
            {otherPoints / 10}
          </NumberDisplayCard>
        </Col>
      </Row>

      <hr className="text-light mt-0 mt-md-4 mb-4" />

      <Row>
        <Col className={colClass}>
          <NumberDisplayCard title="Logins Needed for Level 50">
            {loginsToLevelReadable(
              loginsToLevel(bpLevel, totalPoints, loginCount, 50),
              bpLevel
            )}
          </NumberDisplayCard>
        </Col>
        <Col className={colClass}>
          <NumberDisplayCard title="Logins Needed for Level 75">
            {loginsToLevelReadable(
              loginsToLevel(bpLevel, totalPoints, loginCount, 75),
              bpLevel
            )}
          </NumberDisplayCard>
        </Col>
        <Col className={colClass}>
          <NumberDisplayCard
            title={`Total Possible Levels from ${totalDays} Logins`}
          >
            {pointsFromLogins(totalDays) / 10}
          </NumberDisplayCard>
        </Col>
        <Col className={colClass}>
          <NumberDisplayCard
            title={`Levels Available When Buying Battlepass`}
          >
            15
          </NumberDisplayCard>
        </Col>
      </Row>

      {/* <Row>
        <Col md={12} className={colClass}>
          <Card className={cardClass}>
            <Card.Header>Goal Level</Card.Header>
            <Card.Body className="d-flex flex-column justify-content-center">
              <Form.Group>
                <Form.Label>Goal Level: {goalLevel}</Form.Label>
                <Form.Range
                  min={Math.max(bpLevel, 1)}
                  max={150}
                  value={Math.max(goalLevel, 1).toString()}
                  onChange={(e) => setNumberInput(setGoalLevel, e.target.value)}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}

      <Row>
        <Col className={colClass}>
          <NumberDisplayCard title="Your Possible Level With Only Logins">
            {possibleLevelsLogins}
          </NumberDisplayCard>
        </Col>
        <Col className={colClass}>
          <NumberDisplayCard title="Your Possible Level With Logins and Easy Tasks">
            {possibleLevelsLoginsEasy}
          </NumberDisplayCard>
        </Col>
        <Col className={colClass}>
          <NumberDisplayCard title="Your Possible Level With Logins, Easy Tasks, and Medium Tasks">
            {possibleLevelsLoginsEasyMed}
          </NumberDisplayCard>
        </Col>
      </Row>
      
      <hr className="text-light mt-0 mb-4" />

      <Row>
      <Col className={colClass}>
          <NumberDisplayCard title="Is It Possible To Get the Level 75 Reward Without Challenges and Special Tasks?">
            {possibleLevelsLoginsEasyMedBp > 75 ? 'Yes' : `${Math.round((75 - possibleLevelsLoginsEasyMedBp) * 10) / 10} Levels Needed`}
          </NumberDisplayCard>
        </Col>
      </Row>

      <hr className="text-light mt-0 mb-4" />

      <p className="text-light">Version {APP_VERSION}</p>
    </Container>
  );
}

export default App;
