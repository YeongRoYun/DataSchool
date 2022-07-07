FROM alpine:3.7
LABEL author="yyr"

ARG builddate
ENV BUILDDATE=${builddate}

ENV BUILDFROM="from Alpine"

ENTRYPOINT ["/bin/ash", "-c"]
CMD ["env"]