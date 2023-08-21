import { useState, useEffect } from 'react'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

interface UseContractAndWaitTxHashProps {
  address: `0x${string}`
  abi: any
  functionName: string
  args: any[]
}

export function useContractAndWaitTxHash({ address, abi, functionName, args }: UseContractAndWaitTxHashProps) {
  const [transactionIsPending, setTransactionIsPending] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName,
    args,
  })

  const {
    data: transactionSubmitData,
    isIdle: transactionSubmitIdle,
    isLoading: transactionSubmitLoading,
    isError: transactionSubmitError,
    writeAsync: transactionWrite,
    reset: transactionReset,
  } = useContractWrite(config)

  const { data: transactionReciept, isLoading: actualTxLoading } = useWaitForTransaction({
    hash: transactionSubmitData?.hash,
  })

  useEffect(() => {
    setTransactionIsPending(transactionSubmitLoading || actualTxLoading)
    setError(transactionSubmitError)
  }, [transactionSubmitLoading, actualTxLoading, transactionSubmitError])

  return {
    transactionSubmitIdle,
    transactionWrite,
    transactionReset,
    transactionReciept,
    transactionIsPending,
    error,
  }
}
