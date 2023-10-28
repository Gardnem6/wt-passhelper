import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import dayjs from "dayjs";

import "./App.css";
import NumberDisplayCard from "./components/NumberDisplayCard";
import NumberInput from "./components/NumberInput";
import { pointsFromLogins } from "./helpers/pointsFromLogins";
import ChangelogModal from "./components/ChangelogModal";

function App() {
  const [bpLevel, setBpLevel] = useState(0);
  const [levelProgress, setLevelProgress] = useState(0);
  const [loginCount, setLoginCount] = useState(0);
  const [challengeCount, setChallengeCount] = useState(0);

  const dateFormat = "MMMM D, YYYY";
  const lastDay = dayjs(new Date(2024, 1, 24));
  const daysRemaining = lastDay.diff(dayjs(), "day");
  const totalDays = 92;
  const totalPoints = bpLevel * 10 + levelProgress;
  const pointsForEasy = 2;
  const pointsForMedium = 3;
  const premiumPoints = 150;

  const colClass = "mb-4";
  const cardClass = "h-100";

  // you get 45 points if you finish 14 challenges
  const pointsFromChallenges =
    challengeCount == 14 ? challengeCount * 30 + 45 : challengeCount * 30;

  const otherPoints = Math.max(
    totalPoints - pointsFromLogins(loginCount) - pointsFromChallenges,
    0
  );

  const possiblePointsLogins =
    pointsFromLogins(loginCount + daysRemaining) - pointsFromLogins(loginCount);
  const possiblePointsEasy = daysRemaining * pointsForEasy;
  const possiblePointsMed = daysRemaining * pointsForMedium;

  const possibleLevelsLogins =
    Math.round(totalPoints + possiblePointsLogins) / 10;
  const possibleLevelsLoginsEasy =
    Math.round(totalPoints + possiblePointsLogins + possiblePointsEasy) / 10;
  const possibleLevelsLoginsEasyMed =
    Math.round(
      totalPoints +
        possiblePointsLogins +
        possiblePointsEasy +
        possiblePointsMed
    ) / 10;

  const possibleLevelsLoginsEasyMedBp =
    possibleLevelsLoginsEasyMed + premiumPoints / 10;

  return (
    <Container className="wt-passmaster py-4">
      <h1 className="h2 text-light mb-3">WT Battlepass Calculator</h1>
      <p className="text-light mb-4">
        For Battlepass XIII, "Tropical Storm" ending{" "}
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
        <Col className={colClass}>
          <NumberDisplayCard title="Levels From Logins">
            {pointsFromLogins(loginCount) / 10}
          </NumberDisplayCard>
        </Col>
        <Col className={colClass}>
          <NumberDisplayCard title="Levels From Challenges">
            {pointsFromChallenges / 10}
          </NumberDisplayCard>
        </Col>
        <Col className={colClass}>
          <NumberDisplayCard title="Levels From Daily and Special Tasks">
            {otherPoints / 10}
          </NumberDisplayCard>
        </Col>
      </Row>

      <hr className="text-light mt-0 mb-4" />

      <h3 className="text-light mb-4">Sources of BP Levels</h3>
      <Row>
        <Col className={colClass}>
          <NumberDisplayCard
            title={`Total Possible Levels from ${totalDays} Logins`}
          >
            {pointsFromLogins(totalDays) / 10}
          </NumberDisplayCard>
        </Col>
        <Col className={colClass}>
          <NumberDisplayCard
            title={`Total Possible Levels from ${totalDays} Easy Tasks`}
          >
            {(pointsForEasy * totalDays) / 10}
          </NumberDisplayCard>
        </Col>
        <Col className={colClass}>
          <NumberDisplayCard
            title={`Total Possible Levels from ${totalDays} Medium tasks`}
          >
            {(pointsForMedium * totalDays) / 10}
          </NumberDisplayCard>
        </Col>
      </Row>

      <Row>
        <Col className={colClass}>
          <NumberDisplayCard title={`Levels from 14 Challenges`}>
            {14 * 3}
          </NumberDisplayCard>
        </Col>
        <Col className={colClass}>
          <NumberDisplayCard title={`Levels from Completing All Challenges`}>
            {4.5}
          </NumberDisplayCard>
        </Col>
        <Col className={colClass}>
          <NumberDisplayCard title={`Levels Available When Buying Battlepass`}>
            15
          </NumberDisplayCard>
        </Col>
      </Row>

      <hr className="text-light mt-0 mb-4" />

      <h3 className="text-light mb-4">Your BP Progress</h3>

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

      <Row>
        <Col className={colClass}>
          <NumberDisplayCard title="Is It Possible To Get the Level 75 Reward Without Challenges and Special Tasks?">
            {possibleLevelsLoginsEasyMedBp > 75
              ? "Yes"
              : `${
                  Math.round((75 - possibleLevelsLoginsEasyMedBp) * 10) / 10
                } Levels Needed`}
          </NumberDisplayCard>
        </Col>
      </Row>

      <hr className="text-light mt-0 mb-4" />

      <div className="d-flex align-items-center justify-content-start gap-2">
        <p className="text-light">Version {APP_VERSION}</p>
        <span className='text-white'>|</span>
        <ChangelogModal />
      </div>
    </Container>
  );
}

export default App;
