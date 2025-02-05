"use client";

import type { News } from "@/types";

import { Button, ButtonGroup } from "@heroui/button";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@heroui/react";
import { cn } from "@heroui/theme";
import Image from "next/image";
import { useMemo, useState } from "react";

import NextImageFix from "@/components/next-image-fix";

type Props = {
  post: News["results"]["data"][0];
  index: number;
};

export default function Post({ post, index }: Props) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [reaction, setReaction] = useState("");
  const reactionCount = useMemo(
    () => ({
      bullish:
        reaction === "bullish"
          ? post.reactions.bullish + 1
          : post.reactions.bullish,
      bearish:
        reaction === "bearish"
          ? post.reactions.bearish + 1
          : post.reactions.bearish,
    }),
    [reaction],
  );

  const cleanedSourceUrl = post.source.url
    .replaceAll("https://", "")
    .replaceAll("/", "");

  return (
    <Card key={post._id} className="w-full">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            ImgComponent={NextImageFix}
            imgProps={{
              alt: post.source.name,
              height: 40,
              width: 40,
            }}
            radius="full"
            size="md"
            src={post.source.avatar}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-400">
              {post.source.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {cleanedSourceUrl}
            </h5>
          </div>
        </div>
        <Button
          className={
            isFollowed
              ? "bg-transparent text-foreground border-default-200"
              : ""
          }
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        {post.cover ? (
          <Image
            alt={post.title}
            className="object-cover w-full"
            height={128}
            priority={index === 0 ? true : false}
            src={post.cover}
            width={256}
          />
        ) : null}
        <p
          dangerouslySetInnerHTML={{ __html: post.content_summary }}
          className="text-right my-1"
        />
        <span className="pt-2 text-right">
          <div
            className={cn({
              hidden: post.coin_tag.length === 0,
            })}
          >
            <div className="inline-flex flex-wrap gap-1 items-center">
              {post.coin_tag.map((item) => (
                <Chip
                  key={item._id}
                  avatar={
                    <Avatar
                      ImgComponent={NextImageFix}
                      getInitials={(name) => name.charAt(0)}
                      imgProps={{
                        alt: item.name,
                        height: 20,
                        width: 20,
                      }}
                      name={item.name}
                      size="sm"
                      src={item.icon}
                    />
                  }
                  variant="faded"
                >
                  <span className="text-default-400">{item.name}</span>
                </Chip>
              ))}
            </div>
          </div>
        </span>
      </CardBody>
      <CardFooter className="gap-3" dir="ltr">
        <div className="flex gap-1 grow">
          <p className="font-semibold text-default-400 text-small">
            {post.views}
          </p>
          <p className=" text-default-400 text-small">بازدید</p>
        </div>
        <ButtonGroup>
          <Button
            className="flex gap-1"
            color={reaction === "bearish" ? "primary" : "default"}
            size="sm"
            startContent={<p className="text-default-400 text-small">👎🏻</p>}
            variant="solid"
            onPress={() =>
              setReaction((prev) => (prev === "bearish" ? "" : "bearish"))
            }
          >
            <p className="font-semibold text-foreground text-small">
              {reactionCount.bearish}
            </p>
          </Button>
          <Button
            className="flex gap-1"
            color={reaction === "bullish" ? "primary" : "default"}
            size="sm"
            startContent={<p className="text-default-400 text-small">👍🏻</p>}
            variant="solid"
            onPress={() =>
              setReaction((prev) => (prev === "bullish" ? "" : "bullish"))
            }
          >
            <p className="font-semibold text-foreground text-small">
              {reactionCount.bullish}
            </p>
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
