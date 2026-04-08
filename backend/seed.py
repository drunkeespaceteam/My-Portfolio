import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "portfolio_backend.settings")
django.setup()

from api.models import Project

Project.objects.all().delete()

projects = [
  {
    "title": "DIANA Architecture",
    "themeClass": "theme-diana",
    "image": "/diana_chip.png",
    "description": "Distributed Intelligent Autonomous Neural Architecture. A completely new computing paradigm where every component has its own intelligence, communicates peer to peer autonomously, and CPU never issues commands — it only observes.",
    "tags": ["Computing Paradigm", "Hardware", "N-gram ML", "Python"],
    "github": "https://github.com/drunkeespaceteam/DIANA-Architecture.git",
    "order": 0
  },
  {
    "title": "DecentraVote",
    "themeClass": "theme-decentravote",
    "image": "/decentravote_block.png",
    "description": "A full-stack Web2 + Web3 hybrid voting system. Built with React and Express, backed by MongoDB for off-chain sync, and powered securely by Solidity smart contracts deployed on Ethereum.",
    "tags": ["React", "Express", "Solidity", "Web3"],
    "github": "https://github.com/drunkeespaceteam/DBVS.git",
    "order": 1
  },
  {
    "title": "Interview AI",
    "themeClass": "theme-interview",
    "image": "/interview_ai_bot.png",
    "description": "Practice like a real interview, not like a test. An intelligent platform that helps students prepare for technical interviews by simulating a real environment using an adaptive, self-improving conversational AI.",
    "tags": ["AI Interviewer", "React", "Python", "Adaptive Learning"],
    "github": "https://github.com/drunkee-space/interview-ai.git",
    "order": 2
  }
]

for p in projects:
    Project.objects.create(**p)

print("Database seeded with projects!")
