# Media services

| Option | Choose when | Notes |
| --- | --- | --- |
| **Images in the repository** | Few, stable, part of the design | Simplest. Keep them optimised; git is poor with large binaries |
| **Object storage plus transforms** (R2 and Images, S3 and a resizer, Cloudinary) | Uploads after launch, many sizes, many items | Private originals, public processed copies. Re-encoding also strips location metadata |
| **A CMS pipeline** | You already pay for the CMS | One less thing to run, one more thing to leave behind |
| **Video embed** (YouTube, Vimeo, Instagram) | Video exists elsewhere and is not the product | Load only on a press, and store your own cover |
| **Self-hosted video** | Short, essential, and you control the source | Several renditions, and real bandwidth cost |

## The rules

- Originals private, published copies processed.
- One naming convention, versions rather than overwrites.
- Every image carries dimensions or a ratio in the markup.
- A weight budget for the first screen, written in the blueprint and checked by
  the harness.
- Nothing third-party loads until the reader asks for it.
