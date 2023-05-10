import {
  acceptApply,
  acceptInvitation,
  rejectApply,
  rejectInvitation,
  revokeApply,
  revokeInvitation,
} from "@/libs/hooks/operationHandler";
import type { OperationType } from "@/types/space";
import { Button, ButtonGroup } from "@ui-kitten/components";
import React from "react";

interface OperateButtonProps {
  type: OperationType;
  space: boolean;
  spaceId: string;
  openid: string;
}

const OperateButton = ({
  type,
  space,
  spaceId,
  openid,
}: OperateButtonProps) => {
  return (
    <ButtonGroup appearance="outline" size="small">
      {space ? (
        type === "apply" ? (
          <>
            <Button
              status="primary"
              onPress={() => {
                acceptApply(spaceId, openid).catch((err) => {
                  console.error(err);
                });
              }}
            >
              同意
            </Button>
            <Button
              status="danger"
              onPress={() => {
                rejectApply(spaceId, openid).catch((err) => {
                  console.error(err);
                });
              }}
            >
              不同意
            </Button>
          </>
        ) : (
          <Button
            status="danger"
            onPress={() => {
              revokeInvitation(spaceId, openid).catch((err) => {
                console.error(err);
              });
            }}
          >
            撤销
          </Button>
        )
      ) : type === "apply" ? (
        <Button
          status="danger"
          onPress={() => {
            revokeApply(spaceId).catch((err) => {
              console.error(err);
            });
          }}
        >
          撤销
        </Button>
      ) : (
        <>
          <Button
            status="primary"
            onPress={() => {
              acceptInvitation(spaceId).catch((err) => {
                console.error(err);
              });
            }}
          >
            同意
          </Button>
          <Button
            status="danger"
            onPress={() => {
              rejectInvitation(spaceId).catch((err) => {
                console.error(err);
              });
            }}
          >
            不同意
          </Button>
        </>
      )}
    </ButtonGroup>
  );
};

export default OperateButton;
