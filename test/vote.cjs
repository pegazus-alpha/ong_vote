const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vote Contract", function () {
  let Vote;
  let vote;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let addr4;
  let addr5;
  let addr6;
  let addr7;
  let addr8;
  let addr9;
  let addrs;

  beforeEach(async function () {
    Vote = await ethers.getContractFactory("Vote");
    [owner,addr1,addr2,addr3, addr4,addr5,addr6,addr7,addr8,addr9, ...addrs] = await ethers.getSigners();
    vote = await Vote.deploy();
    // await vote.deployed();
  });

  it("Should add a member", async function () {
    await vote.addMember("John", "Doe", 0, addr1.address); // Adding admin
    await vote.addMember("Jahn", "Do", 0, addr6.address); // Adding admin
    const member = await vote.members(addr1.address);
    const member2 = await vote.members(addr6.address);
    expect(member.nom).to.equal("John");
    expect(member.prenom).to.equal("Doe");
    expect(member.poste).to.equal(0); // Admin
    expect(member2.nom).to.equal("Jahn");
    expect(member2.prenom).to.equal("Do");
    expect(member2.poste).to.equal(0); // Admin
  });

  it("Should add a session", async function () {
    await vote.addMember("Admin", "User", 0, owner.address); // Adding admin
    const currentTime = Math.floor(Date.now() / 1000);
    const start = currentTime + 60; // Start in 1 minute
    const end = start + 3600; // End in 1 hour

    await vote.addSession(start, end);
    const session = await vote.sessions(1);
    expect(session.debut).to.equal(start);
    expect(session.fin).to.equal(end);
    expect(session.state).to.equal(0); // pending
  });

  it("Should add a project", async function () {
    await vote.addMember("Admin", "User", 0, owner.address); // Adding admin
    const currentTime = Math.floor(Date.now() / 1000);
    const start = currentTime + 60; // Start in 1 minute
    const end = start + 3600; // End in 1 hour

    await vote.addSession(start, end);
    await vote.addProject("Project A", "Description A");
    const project = await vote.getProject(0, 1);
    expect(project.nom).to.equal("Project A");
    expect(project.description).to.equal("Description A");
  });

  it("Should allow voting", async function () {
    await vote.addMember("Admin", "User", 0, owner.address); // Adding admin
    await vote.addMember("Voter", "One", 1, addr7.address); // Adding regular member
    const currentTime = Math.floor(Date.now() / 1000);
    const start = currentTime + 60; // Start in 1 minute
    const end = start + 3600; // End in 1 hour

    await vote.addSession(start, end);
    await vote.addProject("Project A", "Description A");

    // Move to the start of the voting session
    await ethers.provider.send("evm_increaseTime", [60]);
    await ethers.provider.send("evm_mine", []);
    // await vote.inscription();
    // await vote.voting(0);
    await vote.connect(addr7).inscription();

    await vote.connect(addr7).voting(0);
    const project = await vote.getProject(0, 1);
    expect(project.nom).to.equal("Project A");
  });
});
