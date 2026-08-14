# Standards

The vertical spine of the curriculum: **domains → strands → grade-level objectives**.

Each domain lives in its own directory with a `domain.md` file that declares its
strands and the grade-level objectives for every grade it serves.

## Layout

```
standards/
└── domains/
    └── domain-01-self-and-identity/
        └── domain.md     # declares strands + grade_objectives (K–12)
```

## Rule

A lesson's `objectives:` field must reference standards declared here. The validator
enforces this, keeping the traceability chain intact.
